import React from 'react'

import { useTranslation } from 'react-i18next'

import { routes } from '../../routes'
import Button from '../antd/Button'

const SignUpOpposite = () => {
  const { t } = useTranslation()
  return (
    <Button type='opposite' href={routes.register} size='large'>
      {t('Get free trial')}
    </Button>
  )
}

export default SignUpOpposite
