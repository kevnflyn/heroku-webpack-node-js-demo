
export const USER_ALERTS_REQUEST = 'USER_ALERTS_REQUEST'
export const USER_ALERTS_SUCCESS = 'USER_ALERTS_SUCCESS'
export const USER_ALERTS_FAILURE = 'USER_ALERTS_FAILURE'
export const userAlertsRequest = () => ({
  type: USER_ALERTS_REQUEST
})
export const userAlertsSuccess = userAlerts => ({
  type: USER_ALERTS_SUCCESS,
  payload: { results: { userAlerts } }
})
export const userAlertsFailure = error => ({
  type: USER_ALERTS_FAILURE,
  payload: { error }
})

export const UPDATE_USER_ALERTS_REQUEST = 'UPDATE_USER_ALERTS_REQUEST'
export const UPDATE_USER_ALERTS_SUCCESS = 'UPDATE_USER_ALERTS_SUCCESS'
export const UPDATE_USER_ALERTS_FAILURE = 'UPDATE_USER_ALERTS_FAILURE'
export const updateUserAlertsRequest = () => ({
  type: UPDATE_USER_ALERTS_REQUEST
})
export const updateUserAlertsSuccess = userAlerts => ({
  type: UPDATE_USER_ALERTS_SUCCESS,
  payload: { results: { userAlerts } }
})
export const updateUserAlertsFailure = error => ({
  type: UPDATE_USER_ALERTS_FAILURE,
  payload: { error }
})
