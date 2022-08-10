import { dispatch } from '../../utils/redux'
import {
  userAlertsRequest,
  userAlertsSuccess,
  userAlertsFailure,
  updateUserAlertsRequest,
  updateUserAlertsSuccess,
  updateUserAlertsFailure
} from './actions'
import {
  getUserAlerts,
  putUserAlerts
} from './userService'

export const requestUserAlerts = async () => {
  dispatch(userAlertsRequest())
  try {
    const { userAlerts } = await getUserAlerts()
    dispatch(userAlertsSuccess(userAlerts))
  } catch (error) {
    console.error(error)
    dispatch(userAlertsFailure(error))
    throw error
  }
}

export const updateUserAlerts = async query => {
  dispatch(updateUserAlertsRequest())
  try {
    const { userAlerts } = await putUserAlerts(query)
    dispatch(updateUserAlertsSuccess(userAlerts))
  } catch (error) {
    console.error(error)
    dispatch(updateUserAlertsFailure(error))
    throw error
  }
}
