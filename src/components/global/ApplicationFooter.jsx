import React from 'react'

import Layout from '../antd/Layout'
import PageAlignment from '../layout/PageAlignment'
import SignUpOpposite from '../navigation/SignUpOpposite'
import style from './ApplicationFooter.module.less'

const { Footer } = Layout

const ApplicationFooter = () => (
  <Footer className={style.footer}>
    <PageAlignment>
      <SignUpOpposite/>
    </PageAlignment>
  </Footer>
)

export default ApplicationFooter
