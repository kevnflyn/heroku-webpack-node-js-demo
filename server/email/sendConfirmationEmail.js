
const { getSitePrivateUrl } = require('../serverUtils/getSiteBaseUrl')
const { sendMail } = require('../services/mail')
const RegistrationConfirmationEmail = require('./RegistrationConfirmationEmail')

const createConfirmationRoute = (hostname, token) => (
  `${getSitePrivateUrl(hostname)}/confirmRegistration?token=${token}`
)

module.exports = (hostname, userEmail, token) => {
  sendMail(
    userEmail,
    'One more step until you\'ve joined Phare!',
    RegistrationConfirmationEmail(createConfirmationRoute(hostname, token), hostname)
  )
}
