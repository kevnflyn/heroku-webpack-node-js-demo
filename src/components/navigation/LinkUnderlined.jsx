import React from 'react'

import Link from './Link'
import styles from './LinkUnderlined.module.less'

const LinkUnderlined = props => (
  <span className={styles.linkUnderlined}>
    <Link {...props}/>
  </span>
)

export default LinkUnderlined
