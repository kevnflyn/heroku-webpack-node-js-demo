import { useTranslation } from 'react-i18next'

import { NotificationError } from '../components/antd/notifications'
import { requestUserCompany } from '../store/user/effects'

const useRequestUserCompany = () => {
  const { t } = useTranslation()

  const requestUserCompanyHandler = async () => {
    try {
      const userCompany = await requestUserCompany()
      return userCompany
    } catch (error) {
      NotificationError({
        message: t('User Company'),
        description: error.message
      })
    }
  }

  return {
    requestUserCompanyHandler
  }
}

export default useRequestUserCompany
