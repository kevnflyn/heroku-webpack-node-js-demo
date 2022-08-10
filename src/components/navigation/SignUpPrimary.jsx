import React from 'react'

import { useTranslation } from 'react-i18next'

import { routes } from '../../routes'
import Button from '../antd/Button'

const SignUpPrimary = () => {
  const { t } = useTranslation()
  return (
    <Button type='primary' href={routes.register} size='large'>
      {t('Sign up')}
    </Button>
  )
}

export default SignUpPrimary
