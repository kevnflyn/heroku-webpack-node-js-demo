const { complianceNewsEmailJob } = require('./complianceNewsEmailJob')
const copyCleanComplianceTable = require('./copyCleanComplianceTable')
const { regulationWatchAlertJob } = require('./regulationWatchAlertJob')

module.exports = {
  complianceNewsEmailJob,
  copyCleanComplianceTable,
  regulationWatchAlertJob
}
