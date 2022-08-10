import React from 'react'

import Typography from '../antd/Typography'
import styles from './TitleFlat'

const { Title } = Typography

const TitleFlat = props => (
  <Title {...props} className={styles.titleFlat}/>
)

export default TitleFlat
