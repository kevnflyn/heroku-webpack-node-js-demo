
export const appBaseRoute = '/app'

export const routes = {
  home: '/home',
  login: '/login',
  register: '/register',
  passwordResetRequest: '/password-reset-request',
  passwordReset: '/password-reset',

  app: appBaseRoute,
  news: `${appBaseRoute}/search`,
  bookmarks: `${appBaseRoute}/bookmarks`,
  profile: `${appBaseRoute}/profile`,
  welcome: `${appBaseRoute}/welcome`,
  confirmRegistration: `${appBaseRoute}/confirmRegistration`,
  launch: `${appBaseRoute}/launch`,
  regwatch: `${appBaseRoute}/regwatch`
}

export default routes
