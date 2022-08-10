import React from 'react'

import './Button.less'

import styles from './ButtonLink.module.less'

const ButtonLink = ({ type = 'default', ...props }) => (
  <span className={styles[type]}>
    <a {...props}/>
  </span>
)

export default ButtonLink
