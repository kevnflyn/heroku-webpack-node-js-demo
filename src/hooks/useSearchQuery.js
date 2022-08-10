import { useCallback, useMemo } from 'react'

import queryString from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'

import { replaceSearch } from '../utils/url'

export const useSearchQuery = names => {
  const history = useHistory()
  const { search } = useLocation()
  const searchParsed = useMemo(
    () => queryString.parse(search),
    [search]
  )
  const update = useCallback(
    queryParams => {
      const newQuery = {
        ...searchParsed,
        ...queryParams
      }
      replaceSearch(history, `${search}&${newQuery}`)
    },
    [searchParsed, history, search]
  )
  const value = useMemo(
    () => names
      .reduce((query, key) => (
        searchParsed[key] === undefined
          ? query
          : { ...query, [key]: searchParsed[key] }
      ), {}),
    [searchParsed, names]
  )
  return {
    value,
    updateSearch: update
  }
}
