import React, { useEffect } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import useUpdateUserAlerts from '../../../hooks/useUpdateUserAlerts'
import { requestUserAlerts } from '../../../store/userAlerts/effects'
import { useUserAlertsState } from '../../../utils/redux'
import Form from '../../antd/Form'
import ComplianceAlertsOptInField from './ComplianceAlertsOptInField'
import ProfileSetting from './ProfileSetting'

const ComplianceAlertsForm = () => {
  const [form] = Form.useForm()

  const { updateUserAlertsHandler } = useUpdateUserAlerts()

  const onFinish = async formData => {
    await updateUserAlertsHandler(formData)
  }

  const { userAlerts } = useUserAlertsState()

  const { t } = useTranslation()

  useEffect(() => {
    requestUserAlerts()
  }, [])

  if (isEmpty(userAlerts)) {
    return null
  }

  return (
    <ProfileSetting
      direction='vertical'
      form={form}
      onFinish={onFinish}
      initialValues={userAlerts}
      title={t('Here you can change your alerts settings. By default, we send you alerts daily at 8am.')}
    >
      <ComplianceAlertsOptInField/>
    </ProfileSetting>
  )
}

export default ComplianceAlertsForm
