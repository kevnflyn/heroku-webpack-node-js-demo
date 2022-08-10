import React from 'react'

import {
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import PublicRoute from './components/navigation/PublicRoute'
import HomePage from './components/pages/home/HomePage'
import LoginPage from './components/pages/login/LoginPage'
import PasswordResetPage from './components/pages/passwordReset/PasswordResetPage'
import PasswordResetRequestPage from './components/pages/passwordResetRequest/PasswordResetRequestPage'
import RegistrationPage from './components/pages/registration/RegistrationPage'
import { routes } from './routes'
import AppRouting from './routing/AppRouting'

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.app}>
          <AppRouting/>
        </Route>

        {/* <PublicRoute path={routes.launch}>
          <ProductLaunchPage/>
        </PublicRoute> */}
        <PublicRoute path={routes.login}>
          <LoginPage/>
        </PublicRoute>
        <PublicRoute path={routes.passwordResetRequest}>
          <PasswordResetRequestPage/>
        </PublicRoute>
        <PublicRoute path={routes.passwordReset}>
          <PasswordResetPage/>
        </PublicRoute>
        <PublicRoute path={routes.register}>
          <RegistrationPage/>
        </PublicRoute>
        <PublicRoute path={routes.home}>
          <HomePage/>
        </PublicRoute>
        <PublicRoute exact path='/'>
          <Redirect to={routes.home}/>
        </PublicRoute>
        <PublicRoute exact path='/'>
          <Redirect to={routes.launch}/>
        </PublicRoute>
        <PublicRoute path='*'>
          404 PAGE TO BE BUILT
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default Routing
