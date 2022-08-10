import React from 'react'

import Flex from 'styled-flex-component'

import Title from '../typography/Title'
import styles from './GridTitle.module.less'
import Visible from './Visible';

const GridTitle = ({
  color = undefined,
  position = 'center',
  title,
  subtitle
}) => {
  const sharedClasses = [
    styles.default,
    styles[`title-${position}`]
  ]
    .join(' ')
    .trim()
  return (
    <Flex column className={styles.container}>
      <Visible hide={['md']}>
        <Title color={color} level={1} className={sharedClasses}>
          {title}
        </Title>
      </Visible>
      <Visible hide={['xs']} display={['md']}>
        <Title color={color} level={0} className={sharedClasses}>
          {title}
        </Title>
      </Visible>
      {subtitle && (
        <Title color={color} level={3} className={sharedClasses}>
          {subtitle}
        </Title>
      )}
    </Flex>
  )
}

export default GridTitle
