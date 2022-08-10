
const { getSitePrivateUrl } = require('../serverUtils/getSiteBaseUrl')
const { sendMail } = require('../services/mail')
const ComplianceNewsEmail = require('./ComplianceNewsEmail')

const createNewsRoute = (hostname, queryString) => (
  `${getSitePrivateUrl(hostname)}/search${queryString}`
)

module.exports = (
  userEmail,
  hostname,
  queryString,
  newsItems,
  alertDate
) => {
  sendMail(
    userEmail,
    'Your compliance news',
    ComplianceNewsEmail(
      createNewsRoute(hostname, queryString),
      newsItems,
      alertDate
    )
  )
}
