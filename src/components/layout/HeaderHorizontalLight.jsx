import React from 'react'

import Layout from '../antd/Layout'
import styles from './HeaderHorizontalLight.module.less'

const { Header } = Layout

const HeaderHorizontalLight = ({ children }) => (
  <Header className={`${styles.container} header`}>
    {children}
  </Header>
)

export default HeaderHorizontalLight
