import React from 'react'

import { useTranslation } from 'react-i18next'

import { requestRegistration } from '../../../store/user/effects'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationError } from '../../antd/notifications'
import FormWrapper from '../../form/FormWrapper'

const RegistrationForm = ({ onRegistered }) => {
  const { t } = useTranslation()

  const [form] = Form.useForm()

  const onFinish = async formData => {
    try {
      delete formData.confirm
      await requestRegistration(formData)
      onRegistered()
    } catch (error) {
      NotificationError({
        message: t('User registration'),
        description: error.message
      })
    }
  }

  return (
    <FormWrapper form={form} onFinish={onFinish}>
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

      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: t('Password required') },
          { min: 8, message: t('Min. 8 characters') },
          { max: 16, message: t('Max. 16 characters') }
        ]}
      >
        <Input.Password placeholder={t('Password')}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        hasFeedback
        dependencies={['password']}
        rules={[
          { required: true, message: 'Confirm your password' },
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
        <Input.Password placeholder={t('Confirm Password')}/>
      </Form.Item>

      <Button type='primary' htmlType='submit'>{t('Register')}</Button>
    </FormWrapper>
  )
}

export default RegistrationForm
