
export const RESET_USER_STATE = 'RESET_USER_STATE'
export const userStateReset = () => ({
  type: RESET_USER_STATE
})

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
export const USER_RESET = 'USER_RESET'
export const userRequest = () => ({
  type: USER_REQUEST
})
export const userSuccess = user => ({
  type: USER_SUCCESS,
  payload: { results: { user } }
})
export const userFailure = error => ({
  type: USER_FAILURE,
  payload: { error }
})
export const userReset = () => ({
  type: USER_RESET
})

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const loginRequest = () => ({
  type: LOGIN_REQUEST
})
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { results: { user } }
})
export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
})

export const PASSWORD_RESET_REQUEST_REQUEST = 'PASSWORD_RESET_REQUEST_REQUEST'
export const PASSWORD_RESET_REQUEST_SUCCESS = 'PASSWORD_RESET_REQUEST_SUCCESS'
export const PASSWORD_RESET_REQUEST_FAILURE = 'PASSWORD_RESET_REQUEST_FAILURE'
export const passwordResetRequestRequest = () => ({
  type: PASSWORD_RESET_REQUEST_REQUEST
})
export const passwordResetRequestSuccess = user => ({
  type: PASSWORD_RESET_REQUEST_SUCCESS,
  payload: { results: { user } }
})
export const passwordResetRequestFailure = error => ({
  type: PASSWORD_RESET_REQUEST_FAILURE,
  payload: { error }
})

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})
export const logoutSuccess = user => ({
  type: LOGOUT_SUCCESS,
  payload: { results: { user } }
})
export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: { error }
})

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'
export const registrationRequest = () => ({
  type: REGISTRATION_REQUEST
})
export const registrationSuccess = user => ({
  type: REGISTRATION_SUCCESS,
  payload: { results: { user } }
})
export const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  payload: { error }
})

export const CONFIRM_REGISTRATION_REQUEST = 'CONFIRM_REGISTRATION_REQUEST'
export const CONFIRM_REGISTRATION_SUCCESS = 'CONFIRM_REGISTRATION_SUCCESS'
export const CONFIRM_REGISTRATION_FAILURE = 'CONFIRM_REGISTRATION_FAILURE'
export const confirmRegistrationRequest = () => ({
  type: CONFIRM_REGISTRATION_REQUEST
})
export const confirmRegistrationSuccess = (user, token) => ({
  type: CONFIRM_REGISTRATION_SUCCESS,
  payload: { results: { user, token } }
})
export const confirmRegistrationFailure = error => ({
  type: CONFIRM_REGISTRATION_FAILURE,
  payload: { error }
})

export const SIGNUP_TO_NEWS_LETTER_REQUEST = 'SIGNUP_TO_NEWS_LETTER_REQUEST'
export const SIGNUP_TO_NEWS_LETTER_SUCCESS = 'SIGNUP_TO_NEWS_LETTER_SUCCESS'
export const SIGNUP_TO_NEWS_LETTER_FAILURE = 'SIGNUP_TO_NEWS_LETTER_FAILURE'
export const waitingListSignupRequest = () => ({
  type: SIGNUP_TO_NEWS_LETTER_REQUEST
})
export const waitingListSignupSuccess = (newSubscriber, token) => ({
  type: SIGNUP_TO_NEWS_LETTER_SUCCESS,
  payload: { results: { newSubscriber, token } }
})
export const waitingListSignupFailure = error => ({
  type: SIGNUP_TO_NEWS_LETTER_FAILURE,
  payload: { error }
})

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE'
export const userUpdateRequest = () => ({
  type: USER_UPDATE_REQUEST
})
export const userUpdateSuccess = user => ({
  type: USER_UPDATE_SUCCESS,
  payload: { results: { user } }
})
export const userUpdateFailure = error => ({
  type: USER_UPDATE_FAILURE,
  payload: { error }
})

export const USER_COMPANY_REQUEST = 'USER_COMPANY_REQUEST'
export const USER_COMPANY_SUCCESS = 'USER_COMPANY_SUCCESS'
export const USER_COMPANY_FAILURE = 'USER_COMPANY_FAILURE'
export const userCompanyRequest = () => ({
  type: USER_COMPANY_REQUEST
})
export const userCompanySuccess = userCompany => ({
  type: USER_COMPANY_SUCCESS,
  payload: { results: { userCompany } }
})
export const userCompanyFailure = error => ({
  type: USER_COMPANY_FAILURE,
  payload: { error }
})

export const USER_COMPANY_UPDATE_REQUEST = 'USER_COMPANY_UPDATE_REQUEST'
export const USER_COMPANY_UPDATE_SUCCESS = 'USER_COMPANY_UPDATE_SUCCESS'
export const USER_COMPANY_UPDATE_FAILURE = 'USER_COMPANY_UPDATE_FAILURE'
export const userCompanyUpdateRequest = () => ({
  type: USER_COMPANY_UPDATE_REQUEST
})
export const userCompanyUpdateSuccess = userCompany => ({
  type: USER_COMPANY_UPDATE_SUCCESS,
  payload: { results: { userCompany } }
})
export const userCompanyUpdateFailure = error => ({
  type: USER_COMPANY_UPDATE_FAILURE,
  payload: { error }
})

export const USER_LOCALE_UPDATE_REQUEST = 'USER_LOCALE_UPDATE_REQUEST'
export const USER_LOCALE_UPDATE_SUCCESS = 'USER_LOCALE_UPDATE_SUCCESS'
export const USER_LOCALE_UPDATE_FAILURE = 'USER_LOCALE_UPDATE_FAILURE'
export const updateUserLocaleRequest = () => ({
  type: USER_LOCALE_UPDATE_REQUEST
})
export const updateUserLocaleSuccess = locale => ({
  type: USER_LOCALE_UPDATE_SUCCESS,
  payload: { results: { locale } }
})
export const updateUserLocaleFailure = error => ({
  type: USER_LOCALE_UPDATE_FAILURE,
  payload: { error }
})
