import { userApi, sessionUserApi, loginApi, logoutApi, newsLetterApi, registerApi, registerConfirmApi, userCompanyApi, userLocaleApi, passwordResetRequestApi, passwordResetValidateApi, passwordResetApi } from '../../endpoints'
import { getRequest, postRequest, deleteRequest, putRequest } from '../../utils/fetch'

export const fetchSessionUser = () => getRequest(sessionUserApi)

export const fetchUserLocale = () => getRequest(userLocaleApi)

export const authenticateUser = ({ email, password }) => (
  postRequest(loginApi, { email, password })
)

export const deleteUnauthenticateUser = () => (
  deleteRequest(logoutApi)
)

export const signupToNewsLetter = ({
  firstname = null,
  lastname = null,
  company = null,
  title = null,
  email
}) => (
  postRequest(newsLetterApi, { firstname, lastname, company, title, email })
)

export const postPasswordResetRequest = ({ email }) => {
  postRequest(passwordResetRequestApi, { email })
}

export const postPasswordReset = ({ password, token }) => {
  postRequest(passwordResetApi, { password, token })
}

export const postPasswordResetRequestValidation = ({ token }) => (
  postRequest(passwordResetValidateApi, { token })
)

export const registerUser = ({ firstname, lastname, email, password }) => (
  postRequest(registerApi, { firstname, lastname, email, password })
)

export const postConfirmRegistration = ({ token }) => (
  postRequest(registerConfirmApi, { token })
)

export const putUser = ({ firstname, lastname }) => (
  putRequest(userApi, { firstname, lastname })
)

export const getUserCompany = () => getRequest(userCompanyApi)

export const putUserCompany = ({
  jobTitle,
  companyName,
  complianceAuthorities,
  countriesOperating,
  completedOnboardingTimestamp
}) => (
  putRequest(userCompanyApi, {
    jobTitle,
    companyName,
    complianceAuthorities,
    countriesOperating,
    completedOnboardingTimestamp
  })
)

export const postUserCompany = ({
  complianceAuthorities,
  countriesOperating
}) => (
  postRequest(userCompanyApi, {
    complianceAuthorities,
    countriesOperating
  })
)

export const putUserLocale = ({ locale }) => putRequest(userLocaleApi, { locale })
