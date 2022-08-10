import React from 'react'

import classnames from 'classnames'

import Typography from '../antd/Typography'
import styles from './Text.module.less'

const { Text: AntText } = Typography

const Text = ({ children, color, ...props }) => {
  const className = classnames(
    props.className,
    styles.default,
    styles[color]
  )
  return (
    <AntText
      {...props}
      className={className}
    >
      {children}
    </AntText>
  )
}

export default Text
