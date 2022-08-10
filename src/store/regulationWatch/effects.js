import { dispatch } from '../../utils/redux'
import { resetHasRequestedInfiniteNews } from '../news/effects'
import store from '../store'
import {
  createRegulationWatchRequest,
  createRegulationWatchSuccess,
  createRegulationWatchFailure,
  updateRegulationWatchRequest,
  updateRegulationWatchSuccess,
  updateRegulationWatchFailure,
  regulationWatchesRequest,
  regulationWatchesSuccess,
  regulationWatchesFailure,
  activeRegulationWatchSet,
  regulationWatchDeleteRequest,
  regulationWatchDeleteSuccess,
  regulationWatchDeleteFailure,
  regulationWatchNameReplacementRequest,
  regulationWatchNameReplacementSuccess,
  regulationWatchNameReplacementFailure,
  starredWatchRegulationReplaceRequest,
  starredWatchRegulationReplaceSuccess,
  starredWatchRegulationReplaceFailure,
  regulationWatchDailyAlertTimesReplacementRequest,
  regulationWatchDailyAlertTimesReplacementSuccess,
  regulationWatchDailyAlertTimesReplacementFailure,
  regulationWatchAlertActivationRequest,
  regulationWatchAlertActivationSuccess,
  regulationWatchAlertActivationFailure
} from './actions'
import {
  postRegulationWatch,
  getRegulationWatches,
  deleteRegulationWatch,
  putStarredWatchRegulations,
  putRegulationWatch,
  putRegulationWatchName,
  putRegulationWatchDailyAlertTimes,
  putRegulationWatchHasAlertsEnabled
} from './regulationWatchService'

export const createRegWatch = async payload => {
  dispatch(createRegulationWatchRequest())
  try {
    const regulationWatch = await postRegulationWatch(payload)
    dispatch(createRegulationWatchSuccess())
    return regulationWatch
  } catch (error) {
    console.error(error)
    dispatch(createRegulationWatchFailure(error))
    throw error
  }
}

export const updateRegWatch = async (regulationWatchId, payload) => {
  dispatch(updateRegulationWatchRequest())
  try {
    const regulationWatch = await putRegulationWatch(regulationWatchId, payload)
    dispatch(updateRegulationWatchSuccess(regulationWatch))
    return regulationWatch
  } catch (error) {
    console.error(error)
    dispatch(updateRegulationWatchFailure(error))
    throw error
  }
}

export const requestRegWatches = async () => {
  dispatch(regulationWatchesRequest())
  try {
    const regulationWatches = await getRegulationWatches()
    dispatch(regulationWatchesSuccess(regulationWatches))
    return regulationWatches
  } catch (error) {
    console.error(error)
    dispatch(regulationWatchesFailure(error))
    throw error
  }
}

export const createRegWatchWithIncrementalName = async (payload, t) => {
  try {
    await requestRegWatches()
    const { regulationWatchState: { regulationWatches } } = store.getState()
    const name = t('Reg. Watch {{number}}', { number: regulationWatches.length + 1 })
    const regulationWatch = await createRegWatch({
      name,
      filter: payload.filter
    })
    return regulationWatch
  } catch (error) {
    console.error(error)
    dispatch(createRegulationWatchFailure(error))
    throw error
  }
}

export const requestDeleteRegWatch = async regulationWatchId => {
  dispatch(regulationWatchDeleteRequest(regulationWatchId))
  try {
    await deleteRegulationWatch(regulationWatchId)
    const { regulationWatchState: { activeRegulation } } = store.getState()
    dispatch(regulationWatchDeleteSuccess(regulationWatchId))
    if (activeRegulation) {
      resetHasRequestedInfiniteNews()
    }
  } catch (error) {
    console.error(error)
    dispatch(regulationWatchDeleteFailure(error))
    throw new Error(error)
  }
}

export const replaceRegulationWatchName = async (
  regulationWatchId,
  payload
) => {
  dispatch(regulationWatchNameReplacementRequest())
  try {
    const regulationWatch = await putRegulationWatchName(
      regulationWatchId,
      payload
    )
    dispatch(regulationWatchNameReplacementSuccess(regulationWatch))
  } catch (error) {
    console.error(error)
    dispatch(regulationWatchNameReplacementFailure(error))
  }
}

export const replaceStarredWatchRegulations = async (
  regulationWatchId,
  payload
) => {
  dispatch(starredWatchRegulationReplaceRequest())
  try {
    const regulationWatch = await putStarredWatchRegulations(
      regulationWatchId,
      payload
    )
    dispatch(starredWatchRegulationReplaceSuccess(regulationWatch))
  } catch (error) {
    console.error(error)
    dispatch(starredWatchRegulationReplaceFailure(error))
    throw new Error(error)
  }
}

export const replaceRegulationWatchDailyAlertTimes = async (
  regulationWatchId,
  payload
) => {
  dispatch(regulationWatchDailyAlertTimesReplacementRequest())
  try {
    const regulationWatch = await putRegulationWatchDailyAlertTimes(
      regulationWatchId,
      payload
    )
    dispatch(regulationWatchDailyAlertTimesReplacementSuccess(regulationWatch))
  } catch (error) {
    console.error(error)
    dispatch(regulationWatchDailyAlertTimesReplacementFailure(error))
    throw new Error(error.message)
  }
}

export const enableRegulationWatchAlerts = async (
  regulationWatchId,
  payload
) => {
  dispatch(regulationWatchAlertActivationRequest())
  try {
    const regulationWatch = await putRegulationWatchHasAlertsEnabled(
      regulationWatchId,
      payload
    )
    dispatch(regulationWatchAlertActivationSuccess(regulationWatch))
  } catch (error) {
    console.error(error)
    dispatch(regulationWatchAlertActivationFailure(error))
    throw new Error(error)
  }
}

export const setActiveRegulationWatch = regulationWatch => {
  dispatch(activeRegulationWatchSet(regulationWatch))
}
