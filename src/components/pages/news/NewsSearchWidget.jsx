import React from 'react'

import Flex from 'styled-flex-component'

import NewsSearchBar from '../../global/NewsSearchBar'
import NewsWidget from './NewsWidget'

const NewsSearchWidget = () => (
  <NewsWidget>
    <Flex alignCenter justifyBetween style={{ width: '100%' }}>
      <NewsSearchBar/>
    </Flex>
  </NewsWidget>
)

export default NewsSearchWidget
