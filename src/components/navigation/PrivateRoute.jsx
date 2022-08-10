import React, { useCallback, useEffect, useMemo } from 'react'

import { Redirect, Route } from 'react-router-dom'

import { routes } from '../../routes'
import { resetUserState } from '../../store/user/effects'
import { useNetworkState, useUserState } from '../../utils/redux'

const PrivateRoute = ({ children, ...rest }) => {
  const { loading, errors } = useNetworkState()

  const { user } = useUserState()

  const unauthorisedError = useMemo(() => (
    Object
      .values(errors)
      .find(({ status }) => status === 401)
  ), [errors])

  useEffect(() => {
    if (unauthorisedError) {
      resetUserState()
    }
  }, [unauthorisedError])

  if (loading.USER) {
    return null
  }

  return (
    <Route
      {...rest}
      render={
        ({ location }) => user && !unauthorisedError
          ? children
          : <Redirect
            to={{
              pathname: routes.login,
              state: { backLocation: location }
            }}
          />
      }
    />
  )
}

export default PrivateRoute
