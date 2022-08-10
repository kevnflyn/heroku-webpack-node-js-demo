import React from 'react'

import { useTranslation } from 'react-i18next'

import { updateUser } from '../../../store/user/effects'
import { useUserState } from '../../../utils/redux'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationError } from '../../antd/notifications'
import ProfileSetting from './ProfileSetting'

/**
 * ToDo: Decide what to do with this file!
 **/

const UserInfoForm = ({ onRegistered }) => {
  const { t } = useTranslation()

  const [form] = Form.useForm()

  const onFinish = async formData => {
    try {
      await updateUser(formData)
      onRegistered()
    } catch (error) {
      NotificationError({
        message: t('User update'),
        description: error.message
      })
    }
  }

  const { user } = useUserState()

  return (
    <ProfileSetting
      form={form}
      initialValues={user}
      onFinish={onFinish}
      title={t("Person's name")}
    >
      <Form.Item
        name='firstname'
        rules={[{ required: true, message: t('First name required') }]}
      >
        <Input type='string' placeholder={t('First name')}/>
      </Form.Item>

      <Form.Item
        name='lastname'
        rules={[{ required: true, message: t('Last name required') }]}
      >
        <Input type='string' placeholder={t('Surname')}/>
      </Form.Item>
    </ProfileSetting>
  )
}

export default UserInfoForm
