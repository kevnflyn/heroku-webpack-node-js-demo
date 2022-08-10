import React from 'react'

import { useTranslation } from 'react-i18next'

import Form from '../../antd/Form'
import Input from '../../antd/Input'

const JobTitleField = ({ jobTitle }) => {
  const { t } = useTranslation()
  return (
  <Form.Item
    name='jobTitle'
    rules={[
      { required: true, message: t('Job title required') }
    ]}
    initialValue={jobTitle}
  >
    <Input type='text' placeholder={t('Job title')}/>
  </Form.Item>
  )
}

export default JobTitleField
