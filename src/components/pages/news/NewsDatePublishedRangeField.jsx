import React, { useCallback, useMemo } from 'react'

import moment from 'moment'
import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import DatePicker from '../../antd/DatePicker'

const { RangePicker } = DatePicker

const NewsDatePublishedRangeField = ({ bordered = false }) => {
  const { t } = useTranslation()
  const {
    loadInfiniteNewsFromStart,
    queryParams: {
      fromPublishedDate,
      toPublishedDate,
      ...queryParams
    }
  } = useInfiniteNews()

  const onChange = useCallback((dateRange) => {
    const [fromPublishedDate, toPublishedDate] = dateRange
      ? [
          dateRange[0],
          dateRange[1]
        ].map(date => date && date.toISOString())
      : [undefined, undefined]

    loadInfiniteNewsFromStart(
      {
        ...queryParams,
        fromPublishedDate,
        toPublishedDate
      }
    )
  }, [
    queryParams,
    loadInfiniteNewsFromStart
  ])

  const value = useMemo(() => (
    [fromPublishedDate, toPublishedDate].map(date => date && moment(date))
  ), [fromPublishedDate, toPublishedDate])

  const placeholder = useMemo(() => [
    t('From when?'),
    t('to when?')
  ], [t])

  const disabledDateTime = useCallback(current => (
    current && current > moment().endOf('day')
  ), [])

  return (
    <RangePicker
      allowEmpty={[true, true]}
      onChange={onChange}
      bordered={bordered}
      style={{ width: '100%' }}
      value={value}
      placeholder={placeholder}
      disabledDate={disabledDateTime}
    />
  )
}

export default NewsDatePublishedRangeField
