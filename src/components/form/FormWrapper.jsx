import React from 'react'

import Space from 'antd/es/space'

import Form from '../antd/Form'
import styles from './FormWrapper.module.less'

const FormWrapper = ({ children, ...props }) => (
  <Form {...props} className={styles.formWrapper}>
    <Space direction='vertical' size='middle' style={{ width: '100%' }}>
      {children}
    </Space>
  </Form>
)

export default FormWrapper
