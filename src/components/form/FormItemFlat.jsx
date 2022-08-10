import React from 'react'

import Form from '../antd'
import styles from './FormItemFlat.module.less'

const FormItemFlat = props => (
  <Form.Item
    className={styles.formItemFlat}
    {...props}
  />
)

export default FormItemFlat
