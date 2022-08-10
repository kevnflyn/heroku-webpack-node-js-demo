import { userAlertsApi } from '../../endpoints'
import { getRequest, putRequest } from '../../utils/fetch'

export const getUserAlerts = () => (
  getRequest(userAlertsApi)
)

export const putUserAlerts = ({ hasOptedForComplianceAlerts }) => (
  putRequest(userAlertsApi, { hasOptedForComplianceAlerts })
)
