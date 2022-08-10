import React from 'react'

import { useTranslation } from 'react-i18next'

import Form from '../../antd/Form'
import Input from '../../antd/Input'
import ProfileSetting from './ProfileSetting'

const UserEmailForm = () => {
  const [form] = Form.useForm()
  const onFinish = async formData => {
    // delete formData.confirm
    // await updateUser(formData)
    // onRegistered()
  }

  const { t } = useTranslation()

  return (
    <ProfileSetting title={t('Email')} form={form} onFinish={onFinish}>
      <Form.Item
        name='email'
        hasFeedback
        rules={[
          { required: true, message: t('Email required') },
          { type: 'email', message: t('Email invalid') }
        ]}
      >
        <Input type='email' placeholder={t('Email')}/>
      </Form.Item>
    </ProfileSetting>
  )
}

export default UserEmailForm
