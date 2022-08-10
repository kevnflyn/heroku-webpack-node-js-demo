import React, { useEffect, useMemo, useState } from 'react'

import { ClockCircleOutlined, PicLeftOutlined, PushpinFilled, PushpinOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { useLocationFacade } from '../../../hooks/useLocationFacade'
import { requestPinnedArticlesContent } from '../../../store/pinnedArticles/effects'
import { useNetworkState, useNewsState, usePinnedArticlesState } from '../../../utils/redux'
import Button from '../../antd/Button'
import RegulationWatchWidget from '../regwatch/RegulationWatchWidget'
import WidgetTooltipTitle from '../regwatch/WidgetTooltipTitle'
import NewsFeed from './NewsFeed'
import NewsFeedTimeline from './NewsFeedTimeline'
import styles from './NewsFeedWidget.module.less'

const NewsFeedWidget = () => {
  const { t } = useTranslation()

  const {
    pinnedArticles: {
      pinnedArticles
    },
    pinnedArticlesItemsMap
  } = usePinnedArticlesState()

  const [viewSize, setViewSize] = useState('LARGE')
  // const handleViewSizeChange = e => {
  //   setViewSize(e.target.value)
  // }
  const toggleViewSize = async () => {
    setViewSize(viewSize === 'LARGE' ? 'SMALL' : 'LARGE')
  }

  const [isPinnedArticlesView, setIsPinnedArticlesView] = useState(false)
  const togglePinnedArticlesView = async () => {
    setIsPinnedArticlesView(!isPinnedArticlesView)
  }

  const pinnedArticlesItemsList = useMemo(() => (
    pinnedArticles
      .map(pinnedArticleId => pinnedArticlesItemsMap[pinnedArticleId])
      .filter(item => item)
  ), [pinnedArticles, pinnedArticlesItemsMap])

  const { errors } = useNetworkState()
  const { newsResults, loading: newsLoading, hasNextPage } = useNewsState()
  const { loading } = useNetworkState()
  const {
    loadInfiniteNewsFromStart,
    loadInfiniteNewsContinuously
  } = useInfiniteNews()

  const viewSettings = useMemo(() => (
    isPinnedArticlesView
      ? {
          news: pinnedArticlesItemsList,
          error: errors.GET_PINNED_ARTICLES_CONTENT,
          getFunc: requestPinnedArticlesContent,
          hasNextPage: false,
          loading: loading.GET_PINNED_ARTICLES_CONTENT
        }
      : {
          news: newsResults.news,
          error: errors.INFINITE_NEWS,
          getFunc: loadInfiniteNewsContinuously,
          hasNextPage,
          loading: newsLoading
        }
  ),
  [
    pinnedArticlesItemsList,
    isPinnedArticlesView,
    newsResults.news,
    hasNextPage,
    loadInfiniteNewsContinuously,
    errors,
    loading,
    newsLoading
  ])

  const { searchAsObject } = useLocationFacade()
  useEffect(() => {
    const fetchAsync = async () => {
      await loadInfiniteNewsFromStart(searchAsObject)
    }

    fetchAsync()
  }, [])

  return (
    <RegulationWatchWidget
      padding={null}
      title={
        <div className={styles.newsFeedWidget}>
          <WidgetTooltipTitle
            alignCenter
            icon={<ClockCircleOutlined/>}
            widgetTitle={t('Reg. watch')}
            tooltipTitle={t('Scroll through news and pin articles of interest to you.')}
            buttons={
              <>
                {/* <Radio.Group value={viewSize} onChange={handleViewSizeChange}>
                  <Radio.Button type='gray' value="LARGE">
                    <PicLeftOutlined/>
                  </Radio.Button>
                  <Radio.Button type='gray' value="SMALL">
                    <UnorderedListOutlined/>
                  </Radio.Button>
                </Radio.Group> */}
                <Button type='link' onClick={toggleViewSize}>
                  {viewSize === 'LARGE'
                    ? <UnorderedListOutlined/>
                    : <PicLeftOutlined/>}
                </Button>
                <Button type='link' onClick={togglePinnedArticlesView}>
                  {isPinnedArticlesView
                    ? <PushpinOutlined/>
                    : <PushpinFilled/>}
                </Button>
              </>
            }
          />
        </div>
      }
    >
      <>
        {
          viewSize === 'LARGE' && <NewsFeed
            error={viewSettings.error}
            hasNextPage={viewSettings.hasNextPage}
            loading={viewSettings.loading}
            loadMoreNews={viewSettings.getFunc}
            news={viewSettings.news}
          />
        }
        {
          viewSize === 'SMALL' && <div style={{ marginTop: '24px' }}>
            <NewsFeedTimeline
              error={viewSettings.error}
              hasNextPage={viewSettings.hasNextPage}
              loading={viewSettings.loading}
              loadMoreNews={viewSettings.getFunc}
              items={viewSettings.news}
            />
          </div>
        }
      </>
    </RegulationWatchWidget>
  )
}

export default NewsFeedWidget
