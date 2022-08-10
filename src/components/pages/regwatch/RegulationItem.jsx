
import React from 'react'

import List from '../../antd/List'
import NewsTitleLink from '../news/NewsTitleLink'
import styles from './RegulationItem.module.less'

const RegulationItem = ({ item }) => (
  <List.Item className={styles.listItem}>
    <List.Item.Meta title={(
      <NewsTitleLink news={item}/>
    )}/>
  </List.Item>
)

export default RegulationItem
