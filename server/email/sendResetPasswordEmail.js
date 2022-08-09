
const { getSitePublicUrl } = require('../serverUtils/getSiteBaseUrl')
const { sendMail } = require('../services/mail')
const PasswordResetEmail = require('./PasswordResetEmail')

const createConfirmationRoute = (hostname, token) => (
  `${getSitePublicUrl(hostname)}/password-reset?token=${token}`
)

module.exports = (hostname, userEmail, token) => {
  sendMail(
    userEmail,
    'Phare password reset',
    PasswordResetEmail(createConfirmationRoute(hostname, token), hostname)
  )
}
