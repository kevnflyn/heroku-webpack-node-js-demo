import React, { useCallback, useMemo } from 'react'

import { openNewsDrawer } from '../../../store/newsUi/effects'
import { replaceStarredWatchRegulations } from '../../../store/regulationWatch/effects'
import { useRegulationWatchState } from '../../../utils/redux'
import ButtonLink from '../../antd/ButtonLink'
import Timeline from '../../antd/Timeline'
import NewsAlarmIcon from '../news/NewsAlarmIcon'
import NewsTitleLink from '../news/NewsTitleLink'
import StarButton from './StarButton'

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const RegulationTimelineFeedItem = ({ item = {} }) => {
  const dateArticlePublished = useMemo(() => (
    new Date(item.published)
  ), [item.published])

  const {
    activeRegulationWatch: { regulationWatchId, starredRegulations }
  } = useRegulationWatchState()

  const onChange = useCallback(checked => {
    if (checked) {
      replaceStarredWatchRegulations(
        regulationWatchId,
        {
          starredRegulations: starredRegulations
            ? [...starredRegulations, item.id]
            : [item.id]
        }
      )
    } else {
      replaceStarredWatchRegulations(
        regulationWatchId,
        {
          starredRegulations: starredRegulations.reduce(
            (watches, regulationId) => regulationId === item.id
              ? watches
              : [...watches, regulationId],
            []
          )
        }
      )
    }
  }, [starredRegulations, regulationWatchId, item.id])

  return (
    <div style={{ marginLeft: '8px' }}>
      <Timeline.Item
        dot={<StarButton
          onClick={onChange}
          active={starredRegulations &&
            starredRegulations.find(regId => regId === item.id)}
        />}
        key={item.id}
      >
        <small>
          {dateArticlePublished.toLocaleDateString('en-US', options)}
          {' '}
          <NewsAlarmIcon published={item.published}/>
        </small>
        <ButtonLink
          onClick={() => openNewsDrawer(item)}
          style={{ marginBottom: 0, width: '100%' }}
        >
          <NewsTitleLink news={item}/>
        </ButtonLink>
      </Timeline.Item>
    </div>
  )
}

export default RegulationTimelineFeedItem
