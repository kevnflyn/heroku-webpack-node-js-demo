import React from 'react'

import { Link as ReactRouterLink } from 'react-router-dom'

import styles from './Link.module.less'

const Link = ({ ...props }) => (
  <ReactRouterLink {...props} className={styles.link}/>
)

export default Link
