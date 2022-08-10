import { useTranslation } from 'react-i18next'

import { NotificationSuccess, NotificationError } from '../components/antd/notifications'
import { updateUserCompany } from '../store/user/effects'

const useUpdateUserCompany = () => {
  const { t } = useTranslation()

  const updateUserCompanyHandler = async companyData => {
    try {
      await updateUserCompany(companyData)
      NotificationSuccess({
        message: t('User company info updated')
      })
    } catch (error) {
      NotificationError({
        message: t('User company update'),
        description: error.message
      })
    }
  }

  return {
    updateUserCompanyHandler
  }
}

export default useUpdateUserCompany
