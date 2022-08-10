export const CREATE_REGULATION_WATCH_REQUEST = 'CREATE_REGULATION_WATCH_REQUEST'
export const CREATE_REGULATION_WATCH_SUCCESS = 'CREATE_REGULATION_WATCH_SUCCESS'
export const CREATE_REGULATION_WATCH_FAILURE = 'CREATE_REGULATION_WATCH_FAILURE'
export const createRegulationWatchRequest = () => ({
  type: CREATE_REGULATION_WATCH_REQUEST
})
export const createRegulationWatchSuccess = () => ({
  type: CREATE_REGULATION_WATCH_SUCCESS
})
export const createRegulationWatchFailure = error => ({
  type: CREATE_REGULATION_WATCH_FAILURE,
  payload: { error }
})

export const UPDATE_REGULATION_WATCH_REQUEST = 'UPDATE_REGULATION_WATCH_REQUEST'
export const UPDATE_REGULATION_WATCH_SUCCESS = 'UPDATE_REGULATION_WATCH_SUCCESS'
export const UPDATE_REGULATION_WATCH_FAILURE = 'UPDATE_REGULATION_WATCH_FAILURE'
export const updateRegulationWatchRequest = () => ({
  type: UPDATE_REGULATION_WATCH_REQUEST
})
export const updateRegulationWatchSuccess = regulationWatch => ({
  type: UPDATE_REGULATION_WATCH_SUCCESS,
  payload: { results: { regulationWatch } }
})
export const updateRegulationWatchFailure = error => ({
  type: UPDATE_REGULATION_WATCH_FAILURE,
  payload: { error }
})

export const REGULATION_WATCHES_REQUEST = 'REGULATION_WATCHES_REQUEST'
export const REGULATION_WATCHES_SUCCESS = 'REGULATION_WATCHES_SUCCESS'
export const REGULATION_WATCHES_FAILURE = 'REGULATION_WATCHES_FAILURE'
export const regulationWatchesRequest = () => ({
  type: REGULATION_WATCHES_REQUEST
})
export const regulationWatchesSuccess = regulationWatches => ({
  type: REGULATION_WATCHES_SUCCESS,
  payload: { results: { regulationWatches } }
})
export const regulationWatchesFailure = error => ({
  type: REGULATION_WATCHES_FAILURE,
  payload: { error }
})

export const DELETE_REGULATION_WATCH_REQUEST = 'DELETE_REGULATION_WATCH_REQUEST'
export const DELETE_REGULATION_WATCH_SUCCESS = 'DELETE_REGULATION_WATCH_SUCCESS'
export const DELETE_REGULATION_WATCH_FAILURE = 'DELETE_REGULATION_WATCH_FAILURE'
export const regulationWatchDeleteRequest = payload => ({
  type: DELETE_REGULATION_WATCH_REQUEST,
  payload
})
export const regulationWatchDeleteSuccess = regulationWatchId => ({
  type: DELETE_REGULATION_WATCH_SUCCESS,
  payload: { regulationWatchId }
})
export const regulationWatchDeleteFailure = error => ({
  type: DELETE_REGULATION_WATCH_FAILURE,
  payload: { error }
})

export const REPLACE_REGULATION_WATCH_NAME_REQUEST = 'REPLACE_REGULATION_WATCH_NAME_REQUEST'
export const REPLACE_REGULATION_WATCH_NAME_SUCCESS = 'REPLACE_REGULATION_WATCH_NAME_SUCCESS'
export const REPLACE_REGULATION_WATCH_NAME_FAILURE = 'REPLACE_REGULATION_WATCH_NAME_FAILURE'
export const regulationWatchNameReplacementRequest = () => ({
  type: REPLACE_REGULATION_WATCH_NAME_REQUEST
})
export const regulationWatchNameReplacementSuccess = regulationWatch => ({
  type: REPLACE_REGULATION_WATCH_NAME_SUCCESS,
  payload: { results: { regulationWatch } }
})
export const regulationWatchNameReplacementFailure = error => ({
  type: REPLACE_REGULATION_WATCH_NAME_FAILURE,
  payload: { error }
})

export const REPLACE_STARRED_REGULATION_WATCH_REGULATION_REQUEST = 'REPLACE_STARRED_REGULATION_WATCH_REGULATION_REQUEST'
export const REPLACE_STARRED_REGULATION_WATCH_REGULATION_SUCCESS = 'REPLACE_STARRED_REGULATION_WATCH_REGULATION_SUCCESS'
export const REPLACE_STARRED_REGULATION_WATCH_REGULATION_FAILURE = 'REPLACE_STARRED_REGULATION_WATCH_REGULATION_FAILURE'
export const starredWatchRegulationReplaceRequest = () => ({
  type: REPLACE_STARRED_REGULATION_WATCH_REGULATION_REQUEST
})
export const starredWatchRegulationReplaceSuccess = regulationWatch => ({
  type: REPLACE_STARRED_REGULATION_WATCH_REGULATION_SUCCESS,
  payload: { results: { regulationWatch } }
})
export const starredWatchRegulationReplaceFailure = error => ({
  type: REPLACE_STARRED_REGULATION_WATCH_REGULATION_FAILURE,
  payload: { error }
})

export const REPLACE_REGULATION_WATCH_DAILY_ALERT_REQUEST = 'REPLACE_REGULATION_WATCH_DAILY_ALERT_REQUEST'
export const REPLACE_REGULATION_WATCH_DAILY_ALERT_SUCCESS = 'REPLACE_REGULATION_WATCH_DAILY_ALERT_SUCCESS'
export const REPLACE_REGULATION_WATCH_DAILY_ALERT_FAILURE = 'REPLACE_REGULATION_WATCH_DAILY_ALERT_FAILURE'
export const regulationWatchDailyAlertTimesReplacementRequest = () => ({
  type: REPLACE_REGULATION_WATCH_DAILY_ALERT_REQUEST
})
export const regulationWatchDailyAlertTimesReplacementSuccess = regulationWatch => ({
  type: REPLACE_REGULATION_WATCH_DAILY_ALERT_SUCCESS,
  payload: { results: { regulationWatch } }
})
export const regulationWatchDailyAlertTimesReplacementFailure = error => ({
  type: REPLACE_REGULATION_WATCH_DAILY_ALERT_FAILURE,
  payload: { error }
})

export const ENABLE_REGULATION_WATCH_ALERTS_REQUEST = 'ENABLE_REGULATION_WATCH_ALERTS_REQUEST'
export const ENABLE_REGULATION_WATCH_ALERTS_SUCCESS = 'ENABLE_REGULATION_WATCH_ALERTS_SUCCESS'
export const ENABLE_REGULATION_WATCH_ALERTS_FAILURE = 'ENABLE_REGULATION_WATCH_ALERTS_FAILURE'
export const regulationWatchAlertActivationRequest = () => ({
  type: ENABLE_REGULATION_WATCH_ALERTS_REQUEST
})
export const regulationWatchAlertActivationSuccess = regulationWatch => ({
  type: ENABLE_REGULATION_WATCH_ALERTS_SUCCESS,
  payload: { results: { regulationWatch } }
})
export const regulationWatchAlertActivationFailure = error => ({
  type: ENABLE_REGULATION_WATCH_ALERTS_FAILURE,
  payload: { error }
})

export const SET_ACTIVE_REGULATION_WATCH = 'SET_ACTIVE_REGULATION_WATCH'
export const activeRegulationWatchSet = regulationWatch => ({
  type: SET_ACTIVE_REGULATION_WATCH,
  payload: { regulationWatch }
})
