import React, { useState, useEffect, useCallback } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../hooks/useInfiniteNews'
import { storeSearchQuery } from '../../store/news/effects'
import AutoComplete from '../antd/AutoComplete'
import Button from '../antd/Button'
import Input from '../antd/Input'

const NewsSearchBar = ({ bordered = false }) => {
  const { queryParams, loadInfiniteNewsFromStart } = useInfiniteNews()

  const [search, setSearch] = useState(queryParams.search)

  useEffect(() => {
    setSearch(queryParams.search || '')
  }, [
    queryParams.search
  ])

  const searchForString = useCallback(() => {
    loadInfiniteNewsFromStart({ ...queryParams, search })
  }, [
    loadInfiniteNewsFromStart,
    queryParams,
    search
  ])

  const onSearch = useCallback(text => {
    setSearch(text)
    storeSearchQuery({ search: text })
  }, [])

  const { t } = useTranslation()

  // ToDo: use custom hook from https://softwareengineering.stackexchange.com/questions/313715/rest-can-i-use-post-request-to-read-data

  return (
    <>
      <AutoComplete
        onSearch={onSearch}
        dropdownMatchSelectWidth={500}
        style={{ width: '100%' }}
        value={search}
      >
        <Input
          bordered={bordered}
          placeholder={t('Which term or keyword?')}
          size='middle'
          style={{ background: 'white', height: '32px' }}
          onPressEnter={searchForString}
          suffix={<Button type='gray' style={{ padding: 0 }}>
            <SearchOutlined onClick={searchForString}/>
          </Button>}
        />
      </AutoComplete>
    </>
  )
}

export default NewsSearchBar
