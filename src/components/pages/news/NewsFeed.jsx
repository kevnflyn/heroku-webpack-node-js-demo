import React from 'react'

import { useTranslation } from 'react-i18next'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import Flex from 'styled-flex-component'

import List from '../../antd/List'
import Space from '../../antd/Space'
import Spin from '../../antd/Spin'
import Typography from '../../antd/Typography'
import NewsItem from './NewsItem'
import ResetNewsFeedButton from './ResetNewsFeedButton'
import ZeroResults from './ZeroResults'

const { Paragraph } = Typography

const Loader = () => (
  <Space direction='vertical' size={8}>
    <br/>
    <Flex width='100%' justifyCenter>
      <Spin/>
    </Flex>
    <br/>
  </Space>
)

const NewsFeed = ({
  error,
  hasNextPage,
  loading,
  loadMoreNews,
  news
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMoreNews,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to
    // become visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 600px 0px'
  })

  const { t } = useTranslation()

  if (loading && news.length === 0) {
    return <Loader/>
  }

  if (error) {
    return <List>
    <List.Item>
      <Paragraph>
        {t("Oops! Your news feed won't load, please contact support.")}
      </Paragraph>
    </List.Item>
  </List>
  }

  if (news.length === 0 && !hasNextPage) {
    return <List>
      <List.Item>
        <ZeroResults/>
      </List.Item>
    </List>
  }

  return (
    <List>
      {news.map((item, index) => (
        <NewsItem news={item} key={index}/>
      ))}
      {/*
          As long as we have a "next page", we show "Loading" right under the
          list. When it becomes visible on the screen, or it comes near, it
          triggers 'onLoadMore'. This is our "sentry".
          We can also use another "sentry" which is separated from the "Loading"
          component like:
            <div ref={sentryRef} />
            {loading && <ListItem>Loading...</ListItem>}
          and leave "Loading" without this ref.
      */}
      {(loading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loader/>
        </div>
      )}
    </List>
  )
}

export default NewsFeed
