import React, { useCallback, useState, useEffect, useMemo } from 'react'

import { PushpinOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { getNewsItem } from '../../../store/news/newsService'
import { isEmpty, orderBy } from '../../../utils/lodash'
import { useNetworkState, useRegulationWatchState } from '../../../utils/redux'
import SpinnerCentred from '../../animation/SpinnerCentred'
import List from '../../antd/List'
import { NotificationError } from '../../antd/notifications'
import RegulationItem from './RegulationItem'
import RegulationWatchWidget from './RegulationWatchWidget'
import WidgetTooltipTitle from './WidgetTooltipTitle'

const defaultStarredRegulationArticles = {}

const DocumentsWidget = () => {
  const { activeRegulationWatch } = useRegulationWatchState()
  const { t } = useTranslation()

  const [
    starredRegulatonArticlesMap,
    setStarredRegulationArticlesMap
  ] = useState({})

  const starredRegulatonArticlesArray = useMemo(
    () => isEmpty(starredRegulatonArticlesMap)
      ? []
      : orderBy(
        Object.values(starredRegulatonArticlesMap),
        ['order'],
        ['asc']
      ),
    [starredRegulatonArticlesMap]
  )

  const getOrderedNewsItem = useCallback(
    async (newsId, order) => {
      const article = await getNewsItem(newsId)
      return { article, order }
    },
    []
  )

  const [loadingStarredRegulations, setLoadingStarredRegulations] = useState()
  useEffect(() => {
    const updateStarredRegulationArticlesMap = async () => {
      try {
        if (starredRegulatonArticlesArray.length === 0) {
          setLoadingStarredRegulations(true)
        }

        /** Should be an array of length 1 as the difference between
         * `starredRegulations` and `activeRegulationWatch.starredRegulations`
         * should be calculated every time a regulationed is marked with a star
         * */

        const { starredRegulations } = activeRegulationWatch
        const regulations = await Promise.all(
          starredRegulations.map((starredRegulationId, order) => {
            const existingArticle = starredRegulatonArticlesMap[
              starredRegulationId
            ]

            if (existingArticle) {
              return {
                order,
                article: existingArticle.article
              }
            }

            return getOrderedNewsItem(starredRegulationId, order)
          })
        )

        setStarredRegulationArticlesMap(regulations)
      } catch (error) {
        NotificationError({ message: error.message })
      } finally {
        setLoadingStarredRegulations(false)
      }
    }

    if (
      (activeRegulationWatch === null ||
      activeRegulationWatch.starredRegulations === null ||
      activeRegulationWatch.starredRegulations.length === 0) &&
      !isEmpty(starredRegulatonArticlesMap)) {
      setStarredRegulationArticlesMap(defaultStarredRegulationArticles)
    } else if (activeRegulationWatch &&
      !isEmpty(activeRegulationWatch.starredRegulations) &&
      (starredRegulatonArticlesArray.length !==
        activeRegulationWatch.starredRegulations.length)) {
      updateStarredRegulationArticlesMap()
    }
  }, [
    activeRegulationWatch,
    getOrderedNewsItem,
    starredRegulatonArticlesMap,
    starredRegulatonArticlesArray
  ])

  const { loading } = useNetworkState()

  return (
    <RegulationWatchWidget
      title={
        <WidgetTooltipTitle
          alignCenter
          icon={<PushpinOutlined/>}
          widgetTitle={t('Pinned Articles')}
          tooltipTitle={t('Your pinned articles appear here.')}
        />
      }
      loading={!activeRegulationWatch || loadingStarredRegulations}
    >
      <List>
        <List.Item>
          {!loading.REPLACE_STARRED_REGULATION_WATCH_REGULATION &&
            isEmpty(starredRegulatonArticlesArray) && (
            <p>{t('You have not yet pinned any articles.')}</p>
          )}
        </List.Item>
        {!isEmpty(starredRegulatonArticlesArray) &&
        starredRegulatonArticlesArray.map(({ article }) => (
          <RegulationItem key={article.id} item={article}/>
        ))}
        {loading.REPLACE_STARRED_REGULATION_WATCH_REGULATION && (
          <SpinnerCentred/>
        )}
      </List>
    </RegulationWatchWidget>
  )
}

export default DocumentsWidget
