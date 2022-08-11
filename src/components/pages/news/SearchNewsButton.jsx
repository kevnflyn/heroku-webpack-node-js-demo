import React, { useCallback, useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { isEmpty } from '../../../utils/lodash'
import { parseQuery } from '../../../utils/queryString'
import { useNewsState } from '../../../utils/redux'
import Button from '../../antd/Button'

const SearchNewsButton = () => {
  const { t } = useTranslation()

  const { loadInfiniteNewsFromStart } = useInfiniteNews()

  const { storedSearchQuery } = useNewsState()

  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const onClickSearchNews = useCallback(async () => {
    const search = isEmpty(storedSearchQuery)
      ? parseQuery(location.search)
      : storedSearchQuery

    setLoading(true)
    await loadInfiniteNewsFromStart(search)
    setLoading(false)
  }, [
    location,
    loadInfiniteNewsFromStart,
    storedSearchQuery
  ])

  return (
    <Button
      loading={loading}
      onClick={onClickSearchNews}
      type='primary'
      size='middle'
      block
    >
      <SearchOutlined/>
      {t('Search')}
    </Button>
  )
}

export default SearchNewsButton
