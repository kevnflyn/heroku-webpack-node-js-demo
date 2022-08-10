import React, { useMemo } from 'react'

import { BellFilled } from '@ant-design/icons'

import { phareOppositeColor } from '../../../style/variables/colors'

const NewsAlarmIcon = ({ published }) => {
  const dateArticlePublished = useMemo(() => (
    new Date(published)
  ), [published])

  const isFromToday = useMemo(() => {
    const today = new Date()
    return (
      dateArticlePublished.getDate() === today.getDate() &&
      dateArticlePublished.getMonth() === today.getMonth() &&
      dateArticlePublished.getYear() === today.getYear()
    )
  }, [dateArticlePublished])

  return isFromToday
    ? <BellFilled style={{ color: phareOppositeColor }}/>
    : null
}

export default NewsAlarmIcon
