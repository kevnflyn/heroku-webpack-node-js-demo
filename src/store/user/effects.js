import i18next from 'i18next'

import { initi18n } from 'I18n/i18n'
import routes from '../../routes'
import { clientStorageLocale } from '../../services/clientStorageLocale'
import { getNavigatorLanguage } from '../../utils/navigatorLanguage'
import { dispatch } from '../../utils/redux'
import { removeAuthErrors } from '../network/effects'
import store from '../store'
import {
  userStateReset,
  userRequest,
  userSuccess,
  userFailure,
  userReset,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  passwordResetRequestRequest,
  passwordResetRequestSuccess,
  passwordResetRequestFailure,
  confirmRegistrationRequest,
  confirmRegistrationSuccess,
  confirmRegistrationFailure,
  waitingListSignupRequest,
  waitingListSignupSuccess,
  waitingListSignupFailure,
  userCompanyRequest,
  userCompanySuccess,
  userCompanyFailure,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFailure,
  userCompanyUpdateRequest,
  userCompanyUpdateSuccess,
  userCompanyUpdateFailure,
  updateUserLocaleRequest,
  updateUserLocaleSuccess,
  updateUserLocaleFailure
} from './actions'
import {
  getUserCompany,
  putUserLocale,
  fetchSessionUser,
  fetchUserLocale,
  authenticateUser,
  deleteUnauthenticateUser,
  signupToNewsLetter,
  registerUser,
  postConfirmRegistration,
  putUser,
  putUserCompany,
  postPasswordResetRequest
} from './userService'

export const updateUserLocale = async locale => {
  dispatch(updateUserLocaleRequest())
  try {
    const response = await putUserLocale({ locale })
    dispatch(updateUserLocaleSuccess(response.locale))
    return { locale }
  } catch (error) {
    console.error(error)
    dispatch(updateUserLocaleFailure(error))
    throw error
  }
}

export const alignUserLocaleWithApplication = async locale => {
  const clientLocale = clientStorageLocale.getLocale()
  if (locale.lang !== clientLocale.lang &&
    typeof clientLocale.lang === 'string') {
    await updateUserLocale(clientLocale)
    await i18next.changeLanguage(clientLocale.lang)
    return clientLocale
  }
  return clientLocale
}

export const requestSessionUser = async () => {
  dispatch(userRequest())
  try {
    /** contains cached user data initially assigned to signed JWT */
    const user = await fetchSessionUser()
    /** all other uncached user data is fetched */
    const { lang } = await fetchUserLocale()
    const userWithLang = { ...user, lang }
    dispatch(userSuccess(userWithLang))
    return userWithLang
  } catch (error) {
    console.error(error)
    dispatch(userFailure(error))
    throw error
  }
}

export const requestSessionUserAndAlignLang = async () => {
  const user = await requestSessionUser()
  const clientLocale = await alignUserLocaleWithApplication({ lang: user.lang })
  return {
    ...user,
    lang: clientLocale.lang
  }
}

export const login = async (
  { email, password },
  history,
  backLocation = routes.news
) => {
  dispatch(loginRequest())
  try {
    await authenticateUser(({ email, password }))
    dispatch(loginSuccess())
    const user = await requestSessionUserAndAlignLang()
    removeAuthErrors()
    history.push(backLocation)

    return user
  } catch (error) {
    console.error(error)
    dispatch(loginFailure(error))
    throw error
  }
}

export const logout = async history => {
  dispatch(logoutRequest())
  try {
    await deleteUnauthenticateUser()
    dispatch(userReset())
    history.push({ pathname: routes.login })
    dispatch(logoutSuccess())
  } catch (error) {
    console.error(error)
    dispatch(logoutFailure(error))
    throw error
  }
}

export const requestPasswordReset = async ({ email }) => {
  dispatch(passwordResetRequestRequest())
  try {
    await postPasswordResetRequest(({ email }))
    dispatch(passwordResetRequestSuccess())
  } catch (error) {
    console.error(error)
    dispatch(passwordResetRequestFailure(error))
    throw error
  }
}

export const signupToWaitingList = async (
  { firstname, lastname, company, title, email }
) => {
  dispatch(waitingListSignupRequest())
  try {
    const newSubscriber = await signupToNewsLetter(({
      firstname,
      lastname,
      company,
      title,
      email
    }))
    dispatch(waitingListSignupSuccess(newSubscriber))
  } catch (error) {
    console.error(error)
    dispatch(waitingListSignupFailure(error))
    throw error
  }
}

export const requestRegistration = async (
  { firstname, lastname, email, password }
) => {
  dispatch(registrationRequest())
  try {
    await registerUser(({ firstname, lastname, email, password }))
    dispatch(registrationSuccess())
  } catch (error) {
    console.error(error)
    dispatch(registrationFailure(error))
    throw error
  }
}

export const confirmRegistration = async token => {
  dispatch(confirmRegistrationRequest())
  try {
    await postConfirmRegistration({ token })
    const user = await requestSessionUserAndAlignLang()
    dispatch(confirmRegistrationSuccess(user, token))
  } catch (error) {
    console.error(error)
    dispatch(confirmRegistrationFailure(error))
    throw error
  }
}

export const updateUser = async (
  { firstname, lastname }
) => {
  dispatch(userUpdateRequest())
  try {
    const user = await putUser(({ firstname, lastname }))
    dispatch(userUpdateSuccess(user))
  } catch (error) {
    console.error(error)
    dispatch(userUpdateFailure(error))
    throw error
  }
}

export const updateUserCompany = async (
  {
    jobTitle,
    companyName,
    complianceAuthorities,
    countriesOperating,
    completedOnboardingTimestamp
  }
) => {
  dispatch(userCompanyUpdateRequest())
  try {
    const { userCompany } = await putUserCompany({
      jobTitle,
      companyName,
      complianceAuthorities,
      countriesOperating,
      completedOnboardingTimestamp
    })
    dispatch(userCompanyUpdateSuccess(userCompany))
  } catch (error) {
    console.error(error)
    dispatch(userCompanyUpdateFailure(error))
    throw error
  }
}

export const requestUserCompany = async () => {
  dispatch(userCompanyRequest())
  try {
    const { userCompany } = await getUserCompany()
    dispatch(userCompanySuccess(userCompany))
    return userCompany
  } catch (error) {
    console.error(error)
    dispatch(userCompanyFailure(error))
    throw error
  }
}

export const resetUserState = () => {
  dispatch(userStateReset())
}
