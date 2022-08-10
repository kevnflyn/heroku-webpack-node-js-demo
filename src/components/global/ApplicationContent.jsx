import React from 'react'

import Layout from '../antd/Layout'
import style from './ApplicationContent.module.less'

const { Content } = Layout

const ApplicationContent = ({ children }) => (
  <Content className={style.content}>
    {children}
  </Content>
)

export default ApplicationContent
