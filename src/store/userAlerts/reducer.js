import {
  USER_ALERTS_SUCCESS,
  UPDATE_USER_ALERTS_SUCCESS
} from './actions'

const initialState = {
  userAlerts: null
}

export const userAlertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ALERTS_SUCCESS: {
      return {
        ...state,
        userAlerts: action.payload.results.userAlerts
      }
    }

    case UPDATE_USER_ALERTS_SUCCESS: {
      return {
        ...state,
        userAlerts: action.payload.results.userAlerts
      }
    }

    default: {
      return state
    }
  }
}
