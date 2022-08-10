import { useTranslation } from 'react-i18next'

import { NotificationSuccess, NotificationError } from '../components/antd/notifications'
import { updateUserAlerts } from '../store/userAlerts/effects'

const useUpdateUserAlerts = () => {
  const { t } = useTranslation()

  const updateUserAlertsHandler = async formData => {
    try {
      await updateUserAlerts(formData)
      NotificationSuccess({
        message: t('Alerts settings updated')
      })
    } catch (error) {
      NotificationError({
        message: t('Alerts settings update'),
        description: error.message
      })
    }
  }

  return {
    updateUserAlertsHandler
  }
}

export default useUpdateUserAlerts
