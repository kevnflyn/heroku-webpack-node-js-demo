import React from 'react'

import Card from './Card'
import styles from './CardPadded.module.less'

const CardPadded = ({ children, ...props }) => (
  <Card {...props}>
    <div className={styles.cardPadded}>
      {children}
    </div>
  </Card>
)

export default CardPadded
