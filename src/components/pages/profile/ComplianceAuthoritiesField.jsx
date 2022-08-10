import React from 'react'

import Typography from 'antd/es/typography'
import { useTranslation } from 'react-i18next'

import complianceSources from '../../../maps/complianceSources'
import Form from '../../antd/Form'
import SelectMultipleChoice from '../../form/SelectMultipleChoice'

const { Paragraph } = Typography

const ComplianceAuthoritiesField = () => {
  const { t } = useTranslation()

  const sourceOptions = Object
    .values(complianceSources(t))
    .map(({
      abbreviation,
      dbvalue,
      label
    }) => ({
      value: dbvalue,
      label: `${label} (${abbreviation})`
    }))

  return (
    <div>
      <Paragraph type='secondary'>
        {t('Which organisations affect your business? {{sourceOptionsLength}} options',
          { sourceOptionsLength: sourceOptions.length })}
      </Paragraph>
      <Form.Item
        name='complianceAuthorities'
        rules={[
          { required: true, message: t('Source required') }
        ]}
      >
        <SelectMultipleChoice
          options={sourceOptions}
        />
      </Form.Item>
    </div>
  )
}

export default ComplianceAuthoritiesField
