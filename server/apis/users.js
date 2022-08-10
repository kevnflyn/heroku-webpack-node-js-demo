
const bcrypt = require('bcrypt')
const chalk = require('chalk')
const debug = require('debug')
const { body, validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')

const defaultDatabase = require('../../db/defaultDatabase')
const sendConfirmationEmail = require('../email/sendConfirmationEmail')
const sendResetPasswordEmail = require('../email/sendResetPasswordEmail')
const auth = require('../middleware/auth')
const internalAuth = require('../middleware/internalAuth')
const getHostnameFromReq = require('../serverUtils/getHostnameFromReq')
const { signJWT, verifyJWT } = require('../serverUtils/jwtUtils')
const removeSensitiveUserData = require('../serverUtils/removeSensitiveUserData')
const { invalidateSession, createSession } = require('../services/session')

const debugSubscribe = debug('subscribe')
const debugRegister = debug('register')
const debugLogin = debug('login')
const debugHandleSesssionCreation = debug('handleSesssionCreation')
const debugUserSession = debug('usersession')
const debugUserCompany = debug('userCompany')
const debugRequestPasswordReset = debug('requestPasswordReset')
const debugUserLocale = debug('userLocale')
const debugUsers = debug('users')

const accessTokenCookie = 'accessToken'
const refreshTokenCookie = 'refreshToken'

const handleDbResponse = (dbRes = {}) => {
  const rows = (
    dbRes.rows &&
    dbRes.rows.map(row => removeSensitiveUserData(row, ['id', 'pswrd']))
  )
  return { rows }
}

const getAccessCookieExpiration = () => {
  const authExpSeconds = 60 * 25
  const authExpMilliseconds = authExpSeconds * 1000
  const authExpDate = new Date(Date.now() + authExpMilliseconds)
  return {
    authExpSeconds,
    authExpMilliseconds,
    authExpDate
  }
}

const getAccessTokenExpiration = () => {
  const jsonWebTokenExpSeconds = 60 * 25
  const jsonWebTokenExpMilliseconds = jsonWebTokenExpSeconds * 1000
  const jsonWebTokenExpDate = new Date(Date.now() + jsonWebTokenExpMilliseconds)
  return {
    jsonWebTokenExpMilliseconds,
    jsonWebTokenExpSeconds,
    jsonWebTokenExpDate
  }
}

const getRefreshTokenExpiration = () => {
  const refreshTokenExpSeconds = 60 * 60 * 24 * 365
  const refreshTokenExpMilliseconds = refreshTokenExpSeconds * 1000
  const refreshTokenExpDate = new Date(Date.now() + refreshTokenExpMilliseconds)
  return {
    refreshTokenExpMilliseconds,
    refreshTokenExpSeconds,
    refreshTokenExpDate
  }
}

const handleSessionCreation = (res, id, email, firstname, lastname) => {
  debugHandleSesssionCreation(chalk.green('Create session'))

  const userSession = createSession(id, email, firstname, lastname)

  debugHandleSesssionCreation(chalk.green('Sign JWT'))

  debugHandleSesssionCreation(chalk.green('Add access token'))

  const { jsonWebTokenExpSeconds } = getAccessTokenExpiration()
  const { authExpMilliseconds } = getAccessCookieExpiration()

  const token = signJWT(
    userSession,
    'ACCESS_TOKEN_SECRET',
    jsonWebTokenExpSeconds
  )

  res.cookie(accessTokenCookie, token, {
    maxAge: authExpMilliseconds,
    secure: false, // set to true if your using https
    httpOnly: true
  })

  debugHandleSesssionCreation(chalk.green('Add refresh token'))

  const {
    refreshTokenExpSeconds,
    refreshTokenExpMilliseconds
  } = getRefreshTokenExpiration()

  const refreshToken = signJWT(
    userSession,
    'REFRESH_TOKEN_SECRET',
    refreshTokenExpSeconds
  )

  res.cookie(refreshTokenCookie, refreshToken, {
    maxAge: refreshTokenExpMilliseconds,
    secure: false, // set to true if your using https
    httpOnly: true
  })

  res.json(userSession)
}

module.exports = router => {
  router.route('/newsletter')
    .post(
      body('firstname').isAlpha().optional({ nullable: true }),
      body('lastname').isAlpha().optional({ nullable: true }),
      body('company').isString().optional({ nullable: true }),
      body('title').isString().optional({ nullable: true }),
      body('email').isEmail(),
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          debugSubscribe(chalk.red('user exists'))
          return res
            .status(400)
            .json({
              messages: errors.array().map(({ param, msg }) => ({
                message: `${msg} ${param}`
              }))
            })
        }

        const db = await defaultDatabase.getClient()
        try {
          const {
            firstname,
            lastname,
            company,
            title,
            email
          } = req.body
          const { rows: [existingSubscriber] } = await defaultDatabase.query(`
            SELECT *
            FROM newsletter
            WHERE email = '${email}'
          `)

          if (existingSubscriber) {
            debugSubscribe(chalk.red('user exists'))
            return res.status(403).json({
              message: 'Subscriber already exists'
            })
          }

          const dbRes = await defaultDatabase.query(`
            INSERT INTO newsletter (firstname, lastname, company, title, email)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
          `, [
            firstname,
            lastname,
            company,
            title,
            email
          ])
          const { rows: [newSubscriber] } = dbRes
          res
            .status(200)
            .json(newSubscriber)
        } catch (error) {
          debugSubscribe(chalk.red('caught Exception subscribing, ', error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/register')
    .post(
      body('firstname').isAlpha(),
      body('lastname').isAlpha(),
      body('email').isEmail(),
      body('password').isLength({ min: 8 }),
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          const errorsArray = errors.array()
          const message = 'Error validating'
          debugRegister(message)
          return res
            .status(400)
            .json({
              errors: errorsArray,
              message
            })
        }

        const db = await defaultDatabase.getClient()
        try {
          const {
            firstname,
            lastname,
            email,
            password
          } = req.body
          const { rows: [existingUser] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = '${email}'
          `)

          if (existingUser) {
            const message = 'User already exists'
            debugRegister(chalk.red(message))
            return res
              .status(403)
              .json({ message })
          }

          debugRegister(chalk.green('Querying DB'))
          const { rows: [registeredUser] } = await defaultDatabase.query(`
            INSERT INTO users (firstname, lastname, email, pswrd, id)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
          `, [
            firstname,
            lastname,
            email,
            await bcrypt.hash(password, 10),
            uuidv4()
          ])

          await defaultDatabase.query(`
            INSERT INTO user_company (
              user_id,
              job_title,
              company_name,
              compliance_authorities,
              countries_operating,
              completed_onboarding_timestamp
            )
            VALUES($1, $2, $3, $4, $5, $6)
          `, [
            registeredUser.id,
            null,
            null,
            null,
            null,
            null
          ])

          await defaultDatabase.query(`
            INSERT INTO pinned_articles (
              user_id,
              pinned_articles
            )
            VALUES($1, $2)
          `, [
            registeredUser.id,
            null
          ])

          await defaultDatabase.query(`
            INSERT INTO user_alerts (user_id)
            VALUES($1)
          `, [
            registeredUser.id
          ])

          debugRegister(chalk.green('Query complete. Signing JWT'))

          const token = signJWT(
            {
              id: registeredUser.id,
              email: registeredUser.email,
              firstname: registeredUser.firstname,
              lastname: registeredUser.lastname
            },
            'REGISTER_TOKEN_SECRET',
            86400 // 24 hours
          )

          debugRegister(chalk.green('Sending confirmation email'))
          const host = getHostnameFromReq(req)
          sendConfirmationEmail(host, email, token)

          debugRegister(chalk.green('Returning registered user'))
          const { rows: [cleanedUser] } = handleDbResponse({
            rows: [registeredUser]
          }, ['id', 'pswrd'])
          res.json({ user: cleanedUser })
        } catch (error) {
          debugRegister(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

    .delete(
      body('email').isEmail(),
      body('password').isLength({ min: 8 }),
      async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ errors: errors.array() })
        }

        const db = await defaultDatabase.getClient()
        try {
          const { email, password } = req.body
          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = $1
          `, [
            email
          ])

          const isMatch = user && await bcrypt.compare(password, user.pswrd)

          if (isMatch) {
            await defaultDatabase.query(`
              DELETE
              FROM users
              WHERE email = $1
            `, [
              email
            ])
            res.sendStatus(200)
          } else {
            res
              .status(403)
              .json({
                message: 'User does not exist'
              })
          }
        } catch (error) {
          debugRegister(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/request-password-reset')
    .post(
      async (req, res) => {
        const db = await defaultDatabase.getClient()
        try {
          const { email } = req.body
          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = '${email}'
          `)

          if (!user) {
            debugRequestPasswordReset(chalk.green('No user found'))
            return res
              .status(200)
              .send({
                message: `
                  If the email exists in our DB, we have sent a reset email.
                `
              })
          }

          debugRequestPasswordReset(chalk.green('Query complete. Signing JWT'))
          const registrationExpSeconds = 86400 // 24 hours
          const token = signJWT(
            {
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname
            },
            'REQUEST_PASSWORD_RESET_TOKEN_SECRET',
            registrationExpSeconds
          )

          debugRequestPasswordReset(chalk.green('Sending reset password email'))
          const host = getHostnameFromReq(req)
          sendResetPasswordEmail(host, email, token)
          res
            .status(200)
            .send({
              message: `
                If the email exists in our DB, we have sent a reset email.
              `
            })
        } catch (error) {
          debugRequestPasswordReset(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      }
    )

  router.route('/password-reset-request/validate')
    .post(
      (req, res) => {
        debugRequestPasswordReset(chalk.green(
          'validate token and ensure token matches'
        ))

        verifyJWT(
          req.body.token,
          'REQUEST_PASSWORD_RESET_TOKEN_SECRET'
        )

        return res
          .status(200)
          .json({
            isValidPasswordResetSession: true
          })
      }
    )

  router.route('/password-reset')
    .post(
      async (req, res) => {
        debugRequestPasswordReset(chalk.green('verify json web token matches'))

        const { payload: userResettingPassword } = verifyJWT(
          req.body.token,
          'REQUEST_PASSWORD_RESET_TOKEN_SECRET'
        )

        if (!userResettingPassword) {
          debugRequestPasswordReset(chalk.red('Error with JWT verification.'))
          return res
            .status(403)
            .json({
              message: 'Invalid or expired token'
            })
        }

        debugRequestPasswordReset(chalk.green('Find user and validate passwrd'))
        const db = await defaultDatabase.getClient()

        try {
          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = $1
          `, [
            userResettingPassword.email
          ])

          const { password } = req.body
          if (await bcrypt.compare(password, user.pswrd)) {
            throw new Error(
              'Your new password cannot be the same as your last password.'
            )
          }

          debugRequestPasswordReset(chalk.green('reset user password'))

          const { rows: [updatedUser] } = await defaultDatabase.query(`
            UPDATE users SET pswrd = $1 WHERE id = $2 RETURNING *
          `, [
            await bcrypt.hash(password, 10),
            user.id
          ])

          debugRequestPasswordReset(chalk.green('return user'))

          res
            .status(200)
            .json({ user: updatedUser })
        } catch (error) {
          debugRequestPasswordReset(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/user')
    .put(
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ errors: errors.array() })
        }

        const db = await defaultDatabase.getClient()
        try {
          const { id } = req.body
          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE id = $1
          `, [
            id
          ])

          if (user) {
            const {
              firstname = user.firstname,
              lastname = user.lastname
            } = req.body
            const { rows: [userUpdated] } = await defaultDatabase.query(`
              UPDATE users
              SET firstname = $2, lastname = $3
              WHERE id = $1
              RETURNING *
            `, [
              id,
              firstname,
              lastname
            ])
            res
              .sendStatus(200)
              .json(userUpdated)
          } else {
            res
              .status(403)
              .json({
                message: 'User does not exist'
              })
          }
        } catch (error) {
          debugRegister(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/internal/users')
    .get(
      internalAuth,
      async (req, res) => {
        debugUsers(chalk.green('Request to internally get users received.'))

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ errors: errors.array() })
        }

        debugUsers(chalk.green('Staring DB.'))

        const db = await defaultDatabase.getClient()

        try {
          debugUsers(chalk.green('Requesting users from DB.'))

          const { ids } = req.query

          const idsQuery = ids
            ? ids
                .filter(id => typeof id === 'string')
                .map(id => `id = '${id}'`)
                .join(' OR ')
            : ''

          const query = `
            SELECT *
            FROM users
            ${idsQuery.length > 0
              ? `WHERE ${idsQuery}`
              : ''}
          `

          const response = await defaultDatabase.query(query)

          debugUsers(chalk.green('Returning response from users table query.'))

          res.send(response.rows)
        } catch (error) {
          debugUsers(chalk.red(error))
          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/register/confirm')
    .post(async (req, res) => {
      debugRegister(chalk.green('Confirm user registration'))

      const { token } = req.body

      const { payload: sessionUser } = verifyJWT(token, 'REGISTER_TOKEN_SECRET')

      if (!sessionUser) {
        debugRegister(chalk.red('Error with JWT verification'))
        return res
          .status(403)
          .json({
            message: 'Invalid or expired token'
          })
      }

      debugRegister(chalk.green('Login registered user automatically'))

      handleSessionCreation(
        res,
        sessionUser.id,
        sessionUser.email,
        sessionUser.firstname,
        sessionUser.lastname
      )
    })

  router.route('/sessionuser')
    .get(auth, async (req, res) => {
      debugUserSession(chalk.green('user found'))
      try {
        debugUserSession(chalk.green('returning user, ', req.user))
        const { email, firstname, lastname } = req.user
        /** We do not expose
         * 1. the ID for security
         * 2. other data that the user could change during the session,
         * which needs to be fetched again and is otherwise cached in
         * the user object that was attached to the signed web token. */
        res.json({ email, firstname, lastname })
      } catch (error) {
        debugUserSession(chalk.red('error sending user'))
        res.send({ message: 'Error in Fetching user', error })
      }
    })

  router.route('/login')
    .post(
      body('email').isEmail(),
      body('password').isLength({ min: 8 }),
      async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          debugLogin(chalk.red(errors.array()))

          return res
            .status(400)
            .json({
              message: 'Password or username incorrect'
            })
        }

        const db = await defaultDatabase.getClient()

        try {
          debugLogin(chalk.green('search user'))

          const { email, password } = req.body

          const { rows: [user] } = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE email = '${email}'
          `)

          debugLogin(chalk.green('check user'))

          if (!user) {
            debugLogin(chalk.red('user doesn\'t exist'))
            return res
              .status(400)
              .json({
                message: 'Password or username incorrect'
              })
          }

          debugLogin(chalk.green('check password'))

          const isMatch = await bcrypt.compare(password, user.pswrd)
          if (!isMatch) {
            debugLogin(chalk.red('password doesn\'t match'))
            return res
              .status(400)
              .json({
                message: 'Password or username incorrect'
              })
          }

          debugLogin(chalk.green('sign json web token'))

          handleSessionCreation(
            res,
            user.id,
            user.email,
            user.firstname,
            user.lastname
          )
        } catch (error) {
          debugLogin(chalk.red(error))

          res
            .status(500)
            .json({
              message: 'Server Error',
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/logout')
    .delete(auth, async (req, res) => {
      res.cookie(accessTokenCookie, '', {
        maxAge: 0,
        httpOnly: true
      })

      res.cookie(refreshTokenCookie, '', {
        maxAge: 0,
        httpOnly: true
      })

      const session = invalidateSession(req.user.sessionId)

      res.send(session)
    })

  router.route('/user/company')
    .put(
      auth,
      body('jobTitle').isString().optional({ nullable: true }),
      body('companyName').isString().optional({ nullable: true }),
      body('complianceAuthorities').isArray().optional({ nullable: true }),
      body('countriesOperating').isArray().optional({ nullable: true }),
      body('completedOnboardingTimestamp').isString()
        .optional({ nullable: true }),
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          debugUserCompany(chalk.red('error validating'))
          return res
            .status(400)
            .json({
              messages: errors.array().map(({ param, msg }) => ({
                message: `${msg} ${param}`
              }))
            })
        }

        const db = await defaultDatabase.getClient()
        try {
          debugUserCompany(chalk.green(`
            checking user company row exists, ${req.user.id}
          `))
          const { rows: [existingUserCompany] } = await defaultDatabase.query(`
            SELECT *
            FROM user_company
            WHERE user_id = '${req.user.id}'
          `)

          debugUserCompany(chalk.green(`
            assigning existing user company to null properties
          `))
          const {
            jobTitle = existingUserCompany.jobTitle,
            companyName = existingUserCompany.companyName,
            complianceAuthorities = existingUserCompany.complianceAuthorities,
            countriesOperating = existingUserCompany.countriesOperating,
            completedOnboardingTimestamp = existingUserCompany
              .completedOnboardingTimestamp
          } = req.body

          debugUserCompany(chalk.green('update user_company'))
          const dbRes = await defaultDatabase.query(`
            UPDATE user_company
            SET job_title = $2,
              company_name = $3,
              compliance_authorities = $4,
              countries_operating = $5,
              completed_onboarding_timestamp = $6
            WHERE user_id = $1
            RETURNING *
          `, [
            req.user.id,
            jobTitle,
            companyName,
            complianceAuthorities,
            countriesOperating,
            completedOnboardingTimestamp
          ])

          const { rows: [userCompany] } = handleDbResponse(
            dbRes,
            ['id', 'pswrd']
          )
          res
            .status(200)
            .json({ userCompany })
        } catch (error) {
          const message = 'Exception adding user company'
          debugUserCompany(chalk.red(message, error))
          res
            .status(500)
            .json({
              message,
              error
            })
        } finally {
          db.release()
        }
      })

  router.route('/user/company')
    .get(
      auth,
      async (req, res, next) => {
        const db = await defaultDatabase.getClient()
        try {
          debugUserCompany(chalk.green(`
            make request for user where user_id = ${req.user.id}
          `))
          const dbRes = await defaultDatabase.query(`
            SELECT *
            FROM user_company
            WHERE user_id = $1
          `, [
            req.user.id
          ])
          const { rows: [userCompany] } = handleDbResponse(
            dbRes,
            ['id', 'pswrd']
          )
          debugUserCompany(chalk.green(`returning userCompany ${userCompany}`))
          res
            .status(200)
            .json({ userCompany })
        } catch (error) {
          const message = `Exception getting user company, ${error}`
          debugUserCompany(chalk.red(message))
          next(message)
        } finally {
          db.release()
        }
      })

  router.route('/user/locale')
    .get(
      auth,
      async (req, res, next) => {
        const db = await defaultDatabase.getClient()
        try {
          debugUserLocale(chalk.green(`
            make request for user's locale where user's id = ${req.user.id}
          `))
          const dbRes = await defaultDatabase.query(`
            SELECT *
            FROM users
            WHERE id = $1
          `, [
            req.user.id
          ])
          const { rows: [{ lang }] } = handleDbResponse(dbRes, ['id', 'pswrd'])
          debugUserLocale(chalk.green(`returning user's locale ${lang}`))
          res
            .status(200)
            .json({ lang })
        } catch (error) {
          const message = `Exception getting user's locale', ${error}`
          debugUserLocale(chalk.red(message))
          next(message)
        } finally {
          db.release()
        }
      })

    .put(
      auth,
      body('lang').isString().optional({ nullable: false }),
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          debugUserLocale(chalk.red('error validating'))
          return res
            .status(400)
            .json({
              messages: errors.array().map(({ param, msg }) => ({
                message: `${msg} ${param}`
              }))
            })
        }

        const db = await defaultDatabase.getClient()
        try {
          const { body: { locale }, user } = req
          debugUserLocale(chalk.green(`
            update lang to ${locale} where user.id = ${req.user.id}
          `))
          await defaultDatabase.query(`
              UPDATE users
              SET lang = $2
              WHERE id = $1
              RETURNING *
            `, [
            user.id,
            locale.lang
          ])
          debugUserLocale(chalk.green('returning locale'))
          res
            .status(200)
            .json({ locale })
        } catch (error) {
          const message = `Exception getting user locale, ${error}`
          debugUserLocale(chalk.red(message))
        } finally {
          db.release()
        }
      })

  router.route('/user/location')
    .get(
      auth,
      async (req, res, next) => {
        try {
          debugUserLocale(chalk.green('get user\'s location'))
          res
            .status(200)
            .json({ location: req.connection.remoteAddress })
        } catch (error) {
          const message = `Exception getting user's location', ${error}`
          debugUserLocale(chalk.red(message))
          next(message)
        }
      })

  return router
}
