import React from 'react'

import { useTranslation } from 'react-i18next'

import Checkbox from '../../antd/Checkbox'
import Form from '../../antd/Form'

const ComplianceAlertsOptInField = () => {
  const { t } = useTranslation()
  return (
  <div>
    <Form.Item
      name='hasOptedForComplianceAlerts'
      valuePropName='checked'
    >
      <Checkbox>
        {' '}
        {t('I would like to receive daily reg. watch alerts by email.')}
      </Checkbox>
    </Form.Item>
  </div>
  )
}

export default ComplianceAlertsOptInField
