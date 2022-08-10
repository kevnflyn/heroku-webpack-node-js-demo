import React from 'react'

import Icon from '@ant-design/icons'

import LighthouseSvg from 'Assets/images/new-brand.svg'
import styles from './BrandIcon.module.less'

const BrandIcon = ({ fontSize = '1.5em', size }) => (
  <Icon
    className={styles.brandIcon}
    component={LighthouseSvg}
    style={{
      fontSize,
      width: size,
      height: size
    }}
  />
)

export default BrandIcon
