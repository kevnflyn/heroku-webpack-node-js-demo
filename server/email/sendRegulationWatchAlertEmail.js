
const { getSitePrivateUrl } = require('../serverUtils/getSiteBaseUrl')
const { sendMail } = require('../services/mail')
const RegulationWatchAlertEmail = require('./RegulationWatchAlertEmail')

const createNewsRoute = (hostname) => (
  `${getSitePrivateUrl(hostname)}/regwatch`
)

module.exports = (
  userEmail,
  hostname,
  regulationWatchName,
  regulationWatchId,
  regulationAlertTime,
  newsItems
) => {
  sendMail(
    userEmail,
    `New announcements for ${regulationWatchName}`,
    RegulationWatchAlertEmail(
      createNewsRoute(hostname),
      regulationWatchName,
      regulationWatchId,
      regulationAlertTime,
      newsItems
    )
  )
}
