import React from 'react'

import { useTranslation } from 'react-i18next'

import { clientStorageLocale } from '../../../services/clientStorageLocale'
import { updateUserLocale } from '../../../store/user/effects'
import Button from '../../antd/Button'
import { NotificationError } from '../../antd/notifications'

const UserLocaleButton = ({
  currentAppLang,
  label,
  lang
}) => {
  const { t } = useTranslation()

  const onClick = async formData => {
    try {
      await updateUserLocale(formData)
      clientStorageLocale.setLocale(formData)

      location.reload()
    } catch (error) {
      NotificationError({
        message: t('User Locale'),
        description: error.message
      })
    }
  }

  return (
    <Button
      block
      onClick={onClick}
      disabled={currentAppLang === lang}
    >
      {label}
    </Button>
  )
}

export default UserLocaleButton
