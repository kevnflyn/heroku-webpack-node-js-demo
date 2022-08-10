import React from 'react'

import { openNewsDrawer } from '../../../store/newsUi/effects'
import ButtonLink from '../../antd/ButtonLink'
import NewsTitle from './NewsTitle'
import SearchTextHighlighted from './SearchTextHighlighted'

const NewsTitleLink = ({ news, bold }) => {
  const onClick = () => {
    openNewsDrawer(news)
  }
  return (
    <ButtonLink
      onClick={onClick}
      style={{ textDecoration: 'none', marginBottom: 0, width: '100%' }}
    >
      <NewsTitle>
        {bold
          ? <b>
            <SearchTextHighlighted text={news.header}/>
          </b>
          : <SearchTextHighlighted text={news.header}/>
        }
      </NewsTitle>
    </ButtonLink>
  )
}

export default NewsTitleLink
