import React, { useCallback, useEffect, useMemo } from 'react'

import { ClockCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { isEmpty } from '../../../utils/lodash'
import { useNetworkState, useNewsState, useRegulationWatchState } from '../../../utils/redux'
import RegulationTimelineFeed from './RegulationTimelineFeed'
import RegulationWatchFilters from './RegulationWatchFilters'
import RegulationWatchWidget from './RegulationWatchWidget'
import WidgetTooltipTitle from './WidgetTooltipTitle'

// ToDo: Add logic to display news details of linked email alert.

// import { openNewsDrawer } from '../../../store/newsUi/effects'
// import store from '../../../store/store'
// import { parseQuery } from '../../../utils/queryString'
// /** Open news drawer if viewArticle parameter set in URL. */
// const { viewArticle } = parseQuery(location.search)
// const viewArticleId = parseInt(viewArticle)
// if (!Number.isNaN(viewArticleId)) {
//   const { newsState: { newsResults: { news } } } = store.getState()
//   const newsItem = news.find(({ id }) => id === viewArticleId)
//   if (newsItem) {
//     openNewsDrawer(newsItem)
//   }
// }

const RegulationTimelineWidget = () => {
  const { t } = useTranslation()
  const { activeRegulationWatch } = useRegulationWatchState()

  const { newsResults, loading, hasNextPage } = useNewsState()
  const { errors } = useNetworkState()
  const {
    loadInfiniteNews,
    loadInfiniteNewsFromStart,
    queryParams
  } = useInfiniteNews()

  const loadDocuments = useCallback(() => {
    if (activeRegulationWatch && activeRegulationWatch.filter) {
      loadInfiniteNews({
        ...queryParams,
        ...activeRegulationWatch.filter
      })
    }
  }, [
    activeRegulationWatch,
    loadInfiniteNews,
    queryParams
  ])

  const activeRegulationWatchObject = useMemo(() => (
    activeRegulationWatch === null ? {} : activeRegulationWatch
  ), [activeRegulationWatch])

  useEffect(() => {
    if (!isEmpty(activeRegulationWatchObject)) {
      loadInfiniteNewsFromStart(activeRegulationWatchObject.filter)
    }
  }, [
    loadInfiniteNewsFromStart,
    activeRegulationWatchObject
  ])

  return (
    <RegulationWatchWidget
      title={
        <WidgetTooltipTitle
          alignCenter
          icon={<ClockCircleOutlined/>}
          widgetTitle={t('News feed')}
          tooltipTitle={t('Search for news and pin articles of interest to you. To pin an article, click on the circle next to its title. To filter news, click on the filter icon on the right.')}
          buttons={<RegulationWatchFilters/>}
        />
      }
      loading={!activeRegulationWatch}
    >
      <div style={{ marginTop: '16px' }}>
        <RegulationTimelineFeed
          error={errors.INFINITE_NEWS}
          hasNextPage={hasNextPage}
          loading={loading.INFINITE_NEWS}
          loadMoreNews={loadDocuments}
          items={newsResults.news}
        />
      </div>
    </RegulationWatchWidget>
  )
}

export default RegulationTimelineWidget
