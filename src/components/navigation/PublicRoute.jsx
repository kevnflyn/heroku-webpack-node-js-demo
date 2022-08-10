import React, { useEffect } from 'react'

import { Route } from 'react-router-dom'

import { requestSessionUser } from '../../store/user/effects'
import { useNetworkState, useUserState } from '../../utils/redux'

/** To-Do: Review component
 *
 * We don't need to fetch the user from this component since this is happening
 * in useSetupForApp.js.
*/
const PublicRoute = ({ children, UserIsAuthenticated, ...rest }) => {
  const { loading } = useNetworkState()

  const { user } = useUserState()

  useEffect(() => {
    if (loading.USER && !user) {
      requestSessionUser()
    }
  }, [])

  if (loading.USER) {
    return null
  }

  return (
    <Route
      {...rest}
      render={() => children}
    />
  )
}

export default PublicRoute
