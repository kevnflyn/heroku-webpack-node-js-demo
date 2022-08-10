import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useTranslation } from 'react-i18next'

import { getNews } from '../../../store/news/newsService'
import { useUserState } from '../../../utils/redux'
import Typography from '../../antd/Typography'

const { Text } = Typography

/** ToDo: decide what to do with this component */

const NewsProfileSearchCount = () => {
  const [count, setCount] = useState()
  const { t } = useTranslation()

  const {
    userCompany: {
      complianceAuthorities,
      countriesOperating
    }
  } = useUserState()

  useEffect(() => {
    const getCount = async () => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const news = await getNews(`?${queryString.stringify({
        sources: complianceAuthorities,
        countries: countriesOperating,
        fromPublishedDate: yesterday.toISOString(),
        toPublishedDate: today.toISOString()
      })}`)
      setCount(news.length)
    }
    getCount()
  }, [
    complianceAuthorities,
    countriesOperating
  ])

  if (count) {
    return (
      <Text type='secondary'>
        <span>{t('{{count}} items published today.', { count })}</span>
      </Text>
    )
  }

  return null
}

export default NewsProfileSearchCount
