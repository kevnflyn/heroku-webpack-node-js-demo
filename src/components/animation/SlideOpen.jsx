import React from 'react'

import styles from './SlideOpen.module.less'

const SlideOpen = ({
  children,
  overlay,
  isOpen = false
}) => (
  <div className={`${styles.slideOpenContainer} ${isOpen ? styles.isOpen : ''}`}>
    {children}
    <div className={styles.antMotionCollapse}>
      {overlay}
    </div>
  </div>
)

export default SlideOpen
