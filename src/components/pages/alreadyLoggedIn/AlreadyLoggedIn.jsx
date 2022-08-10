import React from 'react'

import { useTranslation } from 'react-i18next'

import Typography from '../../antd/Typography'

const Paragraph = Typography

const AlreadyLoggedIn = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Paragraph>
        {t('There is no need to access the Login Page while the user is already authenticated.')}
      </Paragraph>
      <Paragraph>
        {t('You may return from wence you came.')}
      </Paragraph>
    </div>
  )
}

export default AlreadyLoggedIn
