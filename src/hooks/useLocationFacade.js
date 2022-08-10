import { useMemo } from 'react'

import { useLocation } from 'react-router-dom'

import { parseQuery } from '../utils/queryString'

export const useLocationFacade = () => {
  const location = useLocation()

  const searchAsObject = useMemo(
    () => parseQuery(location.search),
    [location.search]
  )

  return {
    ...location,
    searchAsObject
  }
}
