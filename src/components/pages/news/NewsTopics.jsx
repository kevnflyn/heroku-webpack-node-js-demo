import React, { useCallback, useEffect } from 'react'

import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
import Flex from 'styled-flex-component'

import routes from '../../../routes'
import { requestNewsFilters } from '../../../store/news/effects'
import { useNewsState } from '../../../utils/redux'
import { goToNews } from '../../../utils/routing'
// import Menu from '../../antd/Menu'
import List from '../../antd/List'
import Typography from '../../antd/Typography'
import Link from '../../navigation/Link'
import NewsComponentTitle from './NewsComponentTitle'
import NewsFilterDelete from './NewsFilterDelete'
import styles from './NewsTopics.module.less'

const { Title, Text } = Typography

/**
 * ToDo: Decide what to do with this component
 */

const NewsTopics = () => {
  // const { newsFilters } = useNewsState()
  const newsFilters = [{
    filter: {
      to: '123',
      from: '123',
      size: 10
    },
    id: 1,
    name: 'Oil Markets',
    alertsCount: 123
  }]
  // const history = useHistory()

  // const newsFilterMap = newsFilters
  //   .reduce((filters, filter) => ({
  //     ...filters,
  //     [filter.id]: filter
  //   }), {})

  // const goToNewsFilter = useCallback(
  //   ({ key: id }) => {
  //     const { name: hash, filter } = newsFilterMap[id]
  //     const search = queryString.stringify(filter)
  //     goToNews(history, { search, hash })
  //   },
  //   [newsFilterMap, history]
  // )

  useEffect(() => {
    requestNewsFilters()
  }, [])

  /** TODO: ADD ALERTS COUNT */

  return (
    <>
      <NewsComponentTitle>
        RegWatch Feeds
      </NewsComponentTitle>
      <List
        // className="demo-loadmore-list"
        // loading={initLoading}
        // itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={newsFilters}
        renderItem={({ filter, name, id, alertsCount }) => (
          <List.Item
            className={styles.newsTopic}
            key={id}
          >
            <Flex style={{ width: '100%' }} justifyBetween alignCenter>
              <Link to={{
                search: queryString.stringify(filter),
                hash: name,
                pathname: routes.news
              }}>
                {name}
              </Link>
              <NewsFilterDelete id={id}/>
            </Flex>
            {alertsCount && (
              <Text type='secondary'>
                {alertsCount} alerts
              </Text>
            )}
          </List.Item>
        )}
      />
      {/* <Menu onClick={goToNewsFilter}>
        {newsFilters.map(({ name, id, alertsCount }) => (
          <Menu.Item
            className={styles.newsTopic}
            key={id}
          >
            <Flex justifyBetween alignCenter>
              <b>
                {name}
              </b>
              <NewsFilterDelete id={id}/>
            </Flex>
            {alertsCount && (
              <Text type='secondary'>
                {alertsCount} alerts
              </Text>
            )}
          </Menu.Item>
        ))}
      </Menu> */}
    </>
  )
}

export default NewsTopics
