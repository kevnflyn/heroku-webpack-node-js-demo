import React from 'react'

import Layout from '../antd/Layout'
import styles from './ApplicationLayout.module.less'

const ApplicationLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <Layout style={{ minHeight: '100vh' }}>
      {children}
    </Layout>
  </div>
)

export default ApplicationLayout
