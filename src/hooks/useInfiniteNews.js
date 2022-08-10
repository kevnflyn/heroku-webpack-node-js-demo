import { useCallback, useMemo } from 'react'

import { useLocation, useHistory } from 'react-router-dom'

import { clearStoredSearchQuery, requestInfiniteNews, resetInfiniteNews } from '../store/news/effects'
import { parseQuery, stringifyQuery } from '../utils/queryString'
import { useNewsState } from '../utils/redux'

const pageSize = 10

const useInfiniteNews = () => {
  const history = useHistory()

  const { pathname, search } = useLocation()
  const { defaultQuery } = useNewsState()

  const currentQueryParams = useMemo(() => parseQuery(search), [search])

  const loadInfiniteNews = useCallback(
    async (newQuery = {}, options = {}) => {
      /**
       * When you want to display a different format from what is being sent
       * (e.g. with dates) you can use aliasParams.
       * */
      const urlQueryState = {
        ...newQuery,
        ...(options.aliasParams || {})
      }

      history.replace({
        pathname,
        search: stringifyQuery(urlQueryState)
      })

      await requestInfiniteNews(`?${stringifyQuery(newQuery)}`)

      clearStoredSearchQuery()
    },
    [
      history,
      pathname
    ]
  )

  const loadInfiniteNewsContinuously = useCallback(async (valueQuery, options) => {
    const newQuery = {
      ...parseQuery(search),
      ...valueQuery
    }

    newQuery.offset = parseInt(newQuery.offset) + pageSize

    await loadInfiniteNews(newQuery, options)
  }, [
    search,
    loadInfiniteNews
  ])

  const loadInfiniteNewsFromStart = useCallback(async (valueQuery = {}, options) => {
    resetInfiniteNews()
    /**
     * Reset news with `defaultQuery`. It should not be possible to reset
     * paginations parameters such as `offset` or `size`, otherwise this would
     * corrupt the set of data put on display for the user. This is why the
     * argument `valueQuery` is overwritten, just in case a developer
     * accidentally sends the `offset` value from the current search query
     * along with `valueQuery`.
     */
    const newQueryContainingDefault = {
      ...defaultQuery, // contains default profile settings e.g. sources
      ...valueQuery,
      offset: defaultQuery.offset,
      size: defaultQuery.size
    }
    await loadInfiniteNews(newQueryContainingDefault, options)
  }, [
    defaultQuery,
    loadInfiniteNews
  ])

  return {
    queryParams: currentQueryParams,
    loadInfiniteNews,
    loadInfiniteNewsContinuously,
    loadInfiniteNewsFromStart
  }
}

export default useInfiniteNews
