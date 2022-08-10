import { REMOVE_AUTH_ERRORS } from './actions'

const initialNetworkState = {
  loading: {
    USER_COMPANY: true,
    USER: true
  },
  errors: {}
}

export const networkReducer = (state = initialNetworkState, action) => {
  const match = action.type.match(/^([A-Z_]+)_(REQUEST|SUCCESS|FAILURE)$/)
  const type = match ? match[2] : ''
  const name = match ? match[1] : ''
  switch (type) {
    case 'REQUEST': {
      return {
        ...state,
        loading: {
          [name]: action.payload || true
        }
      }
    }

    case 'SUCCESS': {
      return {
        ...state,
        errors: {
          [name]: false
        },
        loading: {
          [name]: false
        }
      }
    }

    case 'FAILURE': {
      return {
        ...state,
        errors: {
          [name]: (action.payload && action.payload.error) || true
        },
        loading: {
          [name]: false
        }
      }
    }

    case REMOVE_AUTH_ERRORS: {
      return {
        ...state,
        errors: Object
          .keys(state.errors)
          .reduce((nonAuthErrors, error) => {
            if (error.status === 401) {
              return nonAuthErrors
            }
            return {
              ...nonAuthErrors,
              [name]: error
            }
          }, {}),
      }
    }

    default: {
      return state
    }
  }
}
