import React from 'react'

import langs from '../../../maps/langs'
import { clientStorageLocale } from '../../../services/clientStorageLocale'
import Space from '../../antd/Space'
import ApplicationLocaleButton from './ApplicationLocaleButton'

const langOptions = Object
  .values(langs)
  .map(({
    nativeName,
    key
  }) => ({
    value: key,
    label: nativeName
  }))

/**
 * Locale form for users who have not yet registered
 */

const ApplicationLocaleForm = () => <Space direction='vertical'>
  {langOptions.map(({
    value,
    label
  }) => <ApplicationLocaleButton
    key={value}
    lang={value}
    label={label}
    currentAppLang={clientStorageLocale.getLocale().lang}
  />)}
</Space>

export default ApplicationLocaleForm
