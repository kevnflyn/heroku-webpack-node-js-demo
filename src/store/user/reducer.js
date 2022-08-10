import {
  USER_SUCCESS,
  USER_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_RESET,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CONFIRM_REGISTRATION_SUCCESS,
  CONFIRM_REGISTRATION_FAILURE,
  SIGNUP_TO_NEWS_LETTER_SUCCESS,
  SIGNUP_TO_NEWS_LETTER_FAILURE,
  USER_COMPANY_SUCCESS,
  USER_COMPANY_FAILURE,
  USER_COMPANY_UPDATE_SUCCESS,
  USER_COMPANY_UPDATE_FAILURE,
  USER_LOCALE_UPDATE_SUCCESS,
  RESET_USER_STATE
} from './actions'

const initialUserState = {
  user: null,
  hasSubscribed: null,
  newSubscriber: null,
  isConfirmedRegistree: null,
  loading: true,
  userCompany: null
}

const createUserState = user => ({
  ...user,
  fullname: `${user.firstname} ${user.lastname}`
})

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case RESET_USER_STATE: {
      return initialUserState
    }

    case USER_SUCCESS: {
      return {
        ...state,
        user: createUserState(action.payload.results.user),
        loading: false
      }
    }

    case USER_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    case USER_RESET: {
      return {
        ...state,
        user: null
      }
    }

    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        user: createUserState(action.payload.results.user),
        loading: false
      }
    }

    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        user: null
      }
    }

    case USER_COMPANY_SUCCESS: {
      return {
        ...state,
        userCompany: action.payload.results.userCompany,
        loading: false
      }
    }

    case USER_COMPANY_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    case USER_COMPANY_UPDATE_SUCCESS: {
      return {
        ...state,
        userCompany: action.payload.results.userCompany
      }
    }

    case USER_COMPANY_UPDATE_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    case USER_LOCALE_UPDATE_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          lang: action.payload.results.locale.lang
        }
      }
    }

    case CONFIRM_REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: createUserState(action.payload.results.user),
        isConfirmedRegistree: true,
        loading: false
      }
    }

    case CONFIRM_REGISTRATION_FAILURE: {
      return {
        ...state,
        isConfirmedRegistree: false,
        loading: false
      }
    }

    case SIGNUP_TO_NEWS_LETTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasSubscribed: true,
        newSubscriber: action.payload.results.newSubscriber
      }
    }

    case SIGNUP_TO_NEWS_LETTER_FAILURE: {
      return {
        ...state,
        loading: false,
        hasSubscribed: false
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        loading: false
      }
    }

    case LOGOUT_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}
