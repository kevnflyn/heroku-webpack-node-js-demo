import React, { useMemo } from 'react'

import NewsAlarmIcon from './NewsAlarmIcon'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const NewsItemMeta = ({ item = {} }) => {
  const dateArticlePublished = useMemo(() => (
    new Date(item.published)
  ), [item.published])

  return <small>
    <span style={{
      width: '40px',
      display: 'inline-block',
      marginRight: '4px'
    }}>
      <b>{item.source}</b>
    </span>

    <span style={{
      display: 'inline-block',
      marginRight: '4px'
    }}>
      {dateArticlePublished.toLocaleDateString('en-US', options)}
      {' '}
    </span>

    <NewsAlarmIcon published={item.published}/>

    {/* <span>
      {tags.length !== 0 && <NewsTags inline tags={tags}/>}
    </span> */}
  </small>
}

export default NewsItemMeta
