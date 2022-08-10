import React from 'react'

import Flex from 'styled-flex-component'

import { phareOppositeColorLight } from '../../../style/variables/colors'
import Space from '../../antd/Space'
import Tag from '../../antd/Tag'
import styles from './NewsTags.module.less'

const NewsTags = ({ tags }) => (
  <Flex wrap>
    <Space size={[8, 8]} wrap>
      {tags.map(tag => (
        <Tag
          key={tag}
          className={styles.newsTag}
          color={phareOppositeColorLight}>
          {tag}
        </Tag>
      ))}
    </Space>
  </Flex>
)

export default NewsTags
