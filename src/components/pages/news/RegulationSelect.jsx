import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { regulationGroups } from '../../../maps/regulationGroups'
import { orderBy } from '../../../utils/lodash'
import Select from '../../antd/Select'
import Space from '../../antd/Space'

const createLabel = terms => {
  if (!Array.isArray(terms)) {
    return undefined
  }

  if (terms.length === 1) {
    const [nameOfLaw] = terms
    return nameOfLaw
  }

  if (terms.length === 2) {
    const [nameOfLaw, number] = terms
    return `${nameOfLaw} ${number}`
  }

  const [, abreviation, number] = terms
  return `${abreviation} ${number}`
}

const RegulationSelect = ({
  bordered,
  regulation,
  setRegulation
}) => {
  const { t } = useTranslation()

  const categorySelectOptions = useMemo(() => {
    const mapping = orderBy(
      Object.values(regulationGroups()),
      ['area', 'fullName'],
      ['asc']
    ).reduce((categories, {
      abreviation,
      area,
      nameOfLaw,
      number
    }) => {
      /**
       * The `terms` value contains related terms for one regulation.
       *
       * Should be validated by the BE to make sure combinations are correct.
       *
       * The order of the items is important as it's also used to create the label.
      */

      const terms = [nameOfLaw, abreviation, number].filter(term => term)
      const termsLabel = createLabel(terms)
      return {
        ...categories,
        [area]: {
          label: area,
          options: [
            ...((categories[area] && categories[area].options) || []),
            {
              value: terms,
              label: termsLabel
            }
          ]
        }
      }
    }, {})

    return [
      {
        label: t('Reset data'),
        options: [{
          value: '',
          label: t('No regulation')
        }]
      },
      ...Object.values(mapping)
    ]
  }, [t])

  return (
    <Space direction='vertical' size={8}>
      <label>{t('Regulations')}</label>
      <Select
        showArrow
        value={createLabel(regulation)}
        placeholder={t('Which regulation?')}
        options={categorySelectOptions}
        onChange={setRegulation}
        bordered={bordered}
        style={{
          background: 'white',
          width: '100%'
        }}
        size='middle'
      />
    </Space>
  )
}

export default RegulationSelect
