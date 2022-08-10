import React from 'react'

import { useLocation } from 'react-router-dom'

import Link from '../navigation/Link'

const HeaderLink = ({
  route,
  children
}) => {
  const { pathname } = useLocation()
  return (
  <Link disabled={pathname === route} to={route}>
    {children}
  </Link>
  )
}

export default HeaderLink
