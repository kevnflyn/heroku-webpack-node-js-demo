import React from 'react'

import { clientStorageLocale } from '../../../services/clientStorageLocale'
import Button from '../../antd/Button'

const ApplicationLocaleButton = ({
  currentAppLang,
  label,
  lang
}) => {
  const onClick = () => {
    clientStorageLocale.setLocale({ lang })

    location.reload()
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

export default ApplicationLocaleButton
