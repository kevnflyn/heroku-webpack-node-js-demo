import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { useSearchQuery } from '../../../hooks/useSearchQuery'
import datePublishedRanges from '../../../maps/datePublishedRanges'
import Select from '../../antd/Select'

const { Option } = Select

const options = Object.values(datePublishedRanges)

const NewsDatePublishedSelect = () => {
  const { t } = useTranslation()
  const { value: { fromDatePublished } } = useSearchQuery(['fromDatePublished'])
  const { loadInfiniteNews } = useInfiniteNews()
  const onChange = useCallback(key => {
    loadInfiniteNews(
      datePublishedRanges[key].dateRangeQuery,
      {
        aliasParams: datePublishedRanges[key].aliasParams
      }
    )
  }, [
    loadInfiniteNews
  ])
  return (
    <Select
      defaultValue={options[0].key}
      bordered={false}
      value={fromDatePublished}
      onChange={onChange}
      placeholder={t('Date Published')}
      size='small'
    >
      {options.map(({ label, key }) => (
        <Option key={label} value={key}>
          {label}
        </Option>
      ))}
    </Select>
  )
}

export default NewsDatePublishedSelect
