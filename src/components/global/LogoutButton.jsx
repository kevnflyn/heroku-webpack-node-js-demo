import React from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { logout as logoutEffect } from '../../store/user/effects'
import { NotificationSuccess } from '../antd/notifications'

const LogoutButton = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const logout = async () => {
    await logoutEffect(history)
    NotificationSuccess({
      message: t('See you later!')
    })
  }
  return <div onClick={logout}>{t('Log out')}</div>
}

export default LogoutButton
