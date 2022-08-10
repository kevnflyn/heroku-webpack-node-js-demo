
import React from 'react'

import Flex from 'styled-flex-component'

import Timeline from '../../antd/Timeline'
import SourceAvatar from '../../imagery/SourceAvatar'
import ColDefault from '../../layout/ColDefault'
import RowDefault from '../../layout/RowDefault'
import NewsTitleLink from '../news/NewsTitleLink'
import styles from './NewsFeedTimelineItem.module.less'
import NewsItemMeta from './NewsItemMeta'
import PinNewsCheckbox from './PinNewsCheckbox'

const NewsFeedTimelineItem = ({ item = {} }) => {
  return (
    <div
      className={`${styles.newsFeedTimelineItem}
        ${item.read && styles.newsFeedTimelineItemRead}`}
    >
      <Timeline.Item
        dot={<SourceAvatar size={24} source={item.source}/>}
        key={item.id}
      >
        <RowDefault>
          <ColDefault style={{ padding: 0 }} span={21}>
            <NewsItemMeta item={item}/>
            <NewsTitleLink news={item}/>
          </ColDefault>

          <ColDefault style={{ padding: 0 }} span={3}>
            <Flex full justifyEnd style={{ paddingRight: '20px' }}>
              <PinNewsCheckbox articleId={item.id}/>
            </Flex>
          </ColDefault>
        </RowDefault>
      </Timeline.Item>
    </div>
  )
}

export default NewsFeedTimelineItem
