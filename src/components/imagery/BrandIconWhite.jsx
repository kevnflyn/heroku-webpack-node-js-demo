import React from 'react'

import BrandIcon from './BrandIcon'
import styles from './BrandIconWhite.module.less'

const BrandIconWhite = ({ size }) => (
  <div className={styles.brandIconWhite}>
    <BrandIcon size={size}/>
  </div>
)

export default BrandIconWhite
