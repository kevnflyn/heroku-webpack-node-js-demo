import React, { useMemo, useEffect } from 'react'

import { Route, Redirect, useLocation } from 'react-router-dom'

import routes from '../../routes'
import { confirmRegistration } from '../../store/user/effects'
import { useUserState } from '../../utils/redux'

const ConfirmRegistrationRoute = () => {
  const { search } = useLocation()
  const { isConfirmedRegistree } = useUserState()

  const token = useMemo(() => {
    const token = search.split('=')
    return token[1]
  }, [search])

  useEffect(() => {
    confirmRegistration(token)
  }, [token])

  if (!token) {
    return <Redirect to={routes.news}/>
  }

  if (isConfirmedRegistree === null) {
    return null
  }

  return (
    <Route
      render={
        () => <Redirect to={routes.news}/>
      }
    />
  )
}

export default ConfirmRegistrationRoute
