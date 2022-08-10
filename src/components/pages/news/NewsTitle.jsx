import React from 'react'

import styles from './NewsTitle.module.less'

const NewsTitle = ({ children }) => (
  <div className={styles.newsTitle}>
    {children}
  </div>
)

export default NewsTitle
