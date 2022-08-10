import React from 'react'

import Typography from 'antd/es/typography'
import { useTranslation } from 'react-i18next'

import countries from '../../../maps/countries'
import Form from '../../antd/Form'
import SelectMultipleChoice from '../../form/SelectMultipleChoice'

const { Paragraph } = Typography

const CountriesOperatingField = ({ countriesOperating }) => {
  const { t } = useTranslation()

  const countryOptions = Object
    .values(countries(t))
    .map(({
      label,
      dbvalue
    }) => ({
      value: dbvalue,
      label
    }))

  return (
    <div>
      <Paragraph type='secondary'>
        {t('In which countries are you operating?')}
      </Paragraph>
      <Form.Item
        name='countriesOperating'
        rules={[
          { required: true, message: t('Countries required') }
        ]}
      >
        <SelectMultipleChoice
          defaultValue={countriesOperating}
          options={countryOptions}
        />
      </Form.Item>
    </div>
  )
}

export default CountriesOperatingField
