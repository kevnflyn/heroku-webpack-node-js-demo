import { regulationWatchApi, regulationWatchArticleApi, regulationWatchNameApi, regulationWatchStarredRegulationsApi, regulationWatchDailyAlertTimesApi, regulationWatchHasAlertsEnabledApi } from '../../endpoints'
import { getRequest, postRequest, putRequest, deleteRequest } from '../../utils/fetch'

export const postRegulationWatch = ({
  isPrivate = true,
  name,
  filter
}) => (
  postRequest(regulationWatchApi, {
    isPrivate,
    name,
    filter
  })
)

export const putRegulationWatch = (
  regulationWatchId,
  {
    name,
    filter,
    isPrivate,
    hasAlertsEnabled,
    starredRegulations
  }) => (
  putRequest(regulationWatchArticleApi(regulationWatchId), ({
    name,
    filter,
    isPrivate,
    hasAlertsEnabled,
    starredRegulations
  }))
)

export const getRegulationWatches = () => getRequest(regulationWatchApi)

export const deleteRegulationWatch = regulationWatchId => (
  deleteRequest(regulationWatchArticleApi(regulationWatchId))
)

export const putRegulationWatchName = (
  regulationWatchId,
  { name }
) => (
  putRequest(
    regulationWatchNameApi(regulationWatchId),
    { name }
  )
)

export const putStarredWatchRegulations = (
  regulationWatchId,
  { starredRegulations }
) => (
  putRequest(
    regulationWatchStarredRegulationsApi(regulationWatchId),
    { starredRegulations }
  )
)

export const putRegulationWatchDailyAlertTimes = (
  regulationWatchId,
  {
    alertTimeMonday,
    alertTimeTuesday,
    alertTimeWednesday,
    alertTimeThursday,
    alertTimeFriday,
    alertTimeSaturday,
    alertTimeSunday
  }
) => (
  putRequest(
    regulationWatchDailyAlertTimesApi(regulationWatchId),
    {
      alertTimeMonday,
      alertTimeTuesday,
      alertTimeWednesday,
      alertTimeThursday,
      alertTimeFriday,
      alertTimeSaturday,
      alertTimeSunday
    }
  )
)

export const putRegulationWatchHasAlertsEnabled = (
  regulationWatchId,
  { hasAlertsEnabled }
) => (
  putRequest(
    regulationWatchHasAlertsEnabledApi(regulationWatchId),
    { hasAlertsEnabled }
  )
)
