import { dispatch } from '../../utils/redux'
import {
  authErrorsRemove
} from './actions'

export const removeAuthErrors = () => {
  dispatch(authErrorsRemove())
}
