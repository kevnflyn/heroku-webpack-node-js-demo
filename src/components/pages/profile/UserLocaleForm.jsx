import React from 'react'

import { useTranslation } from 'react-i18next'

import langs from '../../../maps/langs'
import { clientStorageLocale } from '../../../services/clientStorageLocale'
import { useUserState } from '../../../utils/redux'
import Space from '../../antd/Space'
import ApplicationLocaleButton from './ApplicationLocaleButton'

/**
 * Locale form for authenticated/registered users
 */

const langOptions = Object
  .values(langs)
  .map(({
    nativeName,
    key
  }) => ({
    value: key,
    label: nativeName
  }))

const UserLocaleForm = () => {
  const { user } = useUserState()

  const locale = {
    lang: user && user.lang
  }

  if (!locale.lang) {
    return null
  }

  return <Space direction='vertical'>
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
}

export default UserLocaleForm
