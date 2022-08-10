import React from 'react'

import Flex from 'styled-flex-component'

import NewsDatePublishedRangeField from './NewsDatePublishedRangeField'
import NewsWidget from './NewsWidget'

const NewsPublishedFilterWidget = () => (
  <NewsWidget>
    <Flex alignCenter justifyBetween style={{ width: '100%' }}>
      <NewsDatePublishedRangeField/>
    </Flex>
  </NewsWidget>
)

export default NewsPublishedFilterWidget
