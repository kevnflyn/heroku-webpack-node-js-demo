import React from 'react'

import classnames from 'classnames'

import Typography from '../antd/Typography'
import styles from './Title.module.less'

const { Title: AntTitle } = Typography

const Title = ({ children, color, lightweight, ...props }) => {
  const className = classnames(
    props.className,
    styles[color],
    {
      [styles.megaSize]: props.level === 0,
      [styles.lightweight]: lightweight
    }
  )
  return (
    <div className={styles.title}>
      <AntTitle
        {...props}
        className={className}
      >
        {children}
      </AntTitle>
    </div>
  )
}

export default Title
