import React from 'react'

import {
  Route,
  Redirect
} from 'react-router-dom'

import ConfirmRegistrationRoute from '../components/navigation/ConfirmRegistrationRoute'
import PrivateRoute from '../components/navigation/PrivateRoute'
import BookmarksPage from '../components/pages/bookmarks/BookmarksPage'
import NewsPage from '../components/pages/news/NewsPage'
import ProfilePage from '../components/pages/profile/ProfilePage'
// import RegulationWatchPage from '../components/pages/regwatch/RegulationWatchPage'
import WelcomePage from '../components/pages/welcome/WelcomePage'
import { routes } from '../routes'

const AppRouting = () => (
  <>
    <Route path={routes.confirmRegistration}>
      <ConfirmRegistrationRoute/>
    </Route>
    <PrivateRoute path={routes.welcome}>
      <WelcomePage/>
    </PrivateRoute>
    <PrivateRoute path={routes.bookmarks}>
      <BookmarksPage/>
    </PrivateRoute>
    <PrivateRoute path={routes.profile}>
      <ProfilePage/>
    </PrivateRoute>
    <PrivateRoute path={routes.news}>
      <NewsPage/>
    </PrivateRoute>
    {/* <PrivateRoute path={routes.regwatch}>
      <RegulationWatchPage/>
    </PrivateRoute> */}
    <PrivateRoute exact path={routes.app}>
      <Redirect to={routes.news}/>
    </PrivateRoute>
  </>
)

export default AppRouting
