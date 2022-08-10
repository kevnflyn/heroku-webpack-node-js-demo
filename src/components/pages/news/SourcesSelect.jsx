import React, { useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import complianceSources from '../../../maps/complianceSources'
import { useUserState } from '../../../utils/redux'
import Select from '../../antd/Select'
import Space from '../../antd/Space'
import Tag from '../../antd/Tag'

const allOptionsValue = 'allOptions'

const SourcesSelect = ({
  bordered,
  complianceAuthorities = [],
  setComplianceAuthorities
}) => {
  const { t } = useTranslation()

  const { userCompany } = useUserState()

  const categorySelectOptions = useMemo(() => {
    const profileSettingsOptions = [
      ...Object
        .values(complianceSources(t))
        .filter(({ dbvalue }) => userCompany.complianceAuthorities.find(
          authority => authority === dbvalue
        ))
        .map(({ label, dbvalue: value }) => ({ label, value }))
    ]
    return [
      {
        value: allOptionsValue,
        label: complianceAuthorities.length - 1 ===
          profileSettingsOptions.length &&
          complianceAuthorities.find(option => option === allOptionsValue)
          ? t('No sources')
          : t('All sources')
      },
      ...profileSettingsOptions
    ]
  }, [
    t,
    complianceAuthorities,
    userCompany.complianceAuthorities
  ])

  const onChange = useCallback(selectValue => {
    let newSelectValue = null

    /** 'All sources' option was selected */
    if (selectValue.find(option => option === allOptionsValue) &&
      !complianceAuthorities.find(option => option === allOptionsValue)) {
      newSelectValue = categorySelectOptions.map(({ value }) => value)

    /** 'All sources' option was deselected */
    } else if (!selectValue.find(option => option === allOptionsValue) &&
      complianceAuthorities.find(option => option === allOptionsValue)) {
      newSelectValue = []

    /** 'All sources' becomes activated automatically */
    } else if (!selectValue.find(option => option === allOptionsValue) &&
      categorySelectOptions.length - 1 === selectValue.length) {
      newSelectValue = categorySelectOptions.map(({ value }) => value)

    /** 'All sources' becomes deactivated automatically */
    } else if (selectValue.find(option => option === allOptionsValue) &&
      categorySelectOptions.length - 1 === selectValue.length) {
      newSelectValue = selectValue.reduce((selectedOptions, current) => (
        current === allOptionsValue
          ? selectedOptions
          : [current, ...selectedOptions]
      ), [])

    /** Any option besides 'All sources' which does not activate 'All sources'
    */
    } else {
      newSelectValue = selectValue
    }

    setComplianceAuthorities(newSelectValue)
  }, [
    categorySelectOptions,
    setComplianceAuthorities,
    complianceAuthorities])

  const tagRender = useCallback(({
    label,
    value,
    closable,
    onClose
  }) => {
    if (value === allOptionsValue) {
      return null
    }
    const onPreventMouseDown = event => {
      event.preventDefault()
      event.stopPropagation()
    }
    return <Tag
      // color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  }, [])

  return (
    <Space direction='vertical' size={8}>
      <label style={{ paddingBottom: '8px' }}>{t('Sources')}</label>
      <Select
        showArrow
        mode='multiple'
        value={complianceAuthorities}
        placeholder={t('Which compliance sources?')}
        options={categorySelectOptions}
        onChange={onChange}
        bordered={bordered}
        size='middle'
        style={{
          background: 'white',
          width: '100%'
        }}
        tagRender={tagRender}
      />
    </Space>
  )
}

export default SourcesSelect
