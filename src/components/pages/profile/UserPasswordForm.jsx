import React from 'react'

import { useTranslation } from 'react-i18next'

import Form from '../../antd/Form'
import Input from '../../antd/Input'
import ProfileSetting from './ProfileSetting'

const UserPasswordForm = () => {
  const [form] = Form.useForm()
  const onFinish = async formData => {
    // delete formData.confirm
    // await updateUser(formData)
    // onRegistered()
  }

  const { t } = useTranslation()

  return (
    <ProfileSetting title='Password' form={form} onFinish={onFinish}>
      <Form.Item
        name="oldpassword"
        hasFeedback
        rules={[
          { required: true, message: t('Old Password required') },
          { min: 8, message: t('Min. 8 characters') },
          { max: 16, message: t('Max. 16 characters') }
        ]}
      >
        <Input.Password placeholder={t('Old password')} />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: t('Password required') },
          { min: 8, message: t('Min. 8 characters') },
          { max: 16, message: t('Max. 16 characters') }
        ]}
      >
        <Input.Password placeholder={t('Password')} />
      </Form.Item>

      <Form.Item
        name="confirm"
        hasFeedback
        dependencies={['password']}
        rules={[
          { required: true, message: t('Confirm your password') },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(t("Passwords don't match")))
            }
          })
        ]}
      >
        <Input.Password placeholder={t('Confirm password')} />
      </Form.Item>
    </ProfileSetting>
  )
}

export default UserPasswordForm
