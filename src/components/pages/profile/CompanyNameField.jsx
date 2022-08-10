import React from 'react'

import { useTranslation } from 'react-i18next'

import Form from '../../antd/Form'
import Input from '../../antd/Input'

const CompanyNameField = ({ companyName }) => {
  const { t } = useTranslation()
  return (
    <Form.Item
      name='companyName'
      rules={[
        { required: true, message: t('Company name required') }
      ]}
      initialValue={companyName}
    >
      <Input type='text' placeholder={t('Company name')}/>
    </Form.Item>
  )
}

export default CompanyNameField
