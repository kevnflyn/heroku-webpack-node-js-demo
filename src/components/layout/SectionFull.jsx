import React from 'react'

import PageAlignment from '../layout/PageAlignment'
import styles from './SectionFull.module.less'

const SectionFull = ({
  children,
  size = 'full',
  color = 'brand',
  seeThroughLayer = '',
  bgImg = ''
}) => (
  <div className={`
    ${styles[`color-${color}`]}
    ${styles[`size-${size}`]}
    ${styles.wrapper}
  `}
  style={bgImg ? { backgroundImage: `url(${bgImg})` } : {}}>
    <div className={`
      ${styles['see-through-layer']}
      ${styles[`see-through-layer-${seeThroughLayer}`]}
    `}/>
    <PageAlignment>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {children}
        </div>
      </div>
    </PageAlignment>
  </div>
)

export default SectionFull
