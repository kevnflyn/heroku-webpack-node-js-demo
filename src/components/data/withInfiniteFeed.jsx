import React from 'react'

import { useTranslation } from 'react-i18next'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import SpinnerCentred from '../animation/SpinnerCentred'
import List from '../antd/List'
import Typography from '../antd/Typography'
import ResetNewsFeedButton from '../pages/news/ResetNewsFeedButton'
import ZeroResults from '../pages/news/ZeroResults'

const { Paragraph } = Typography

const withInfiniteFeed = (UlComponent, LiComponent) => ({
  error,
  hasNextPage,
  loading,
  loadMoreNews,
  items
}) => {
  const { t } = useTranslation()
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMoreNews,
    disabled: !!error
  })

  if (error) {
    return <List>
    <List.Item>
      <Paragraph>
        {t("Oops! Your news feed won't load, please contact support.")}
      </Paragraph>
    </List.Item>
  </List>
  }

  if (items.length === 0 && !hasNextPage) {
    return <List>
      <List.Item>
        <ZeroResults/>
        <br/>
        <ResetNewsFeedButton/>
      </List.Item>
    </List>
  }

  return (
    <UlComponent>
      {items.map((item, index) => (
        <LiComponent item={item} key={index}/>
      ))}

      {(loading || hasNextPage) && (
        <div ref={sentryRef}>
          <SpinnerCentred/>
        </div>
      )}
    </UlComponent>
  )
}

export default withInfiniteFeed
