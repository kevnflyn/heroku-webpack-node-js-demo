import React from 'react'

import AntButton from 'antd/es/button'
import classNames from 'classnames'

import './Button.less'
import styles from './Button.module.less'

const Button = props => {
  const className = classNames({
    [styles.opposite]: props.type === 'opposite',
    [styles.gray]: props.type === 'gray',
    [styles.tertiary]: props.type === 'tertiary'
  })
  return (
    <span className={className}>
      <AntButton {...props} className={props.className || styles.button}/>
    </span>
  )
}

export default Button
