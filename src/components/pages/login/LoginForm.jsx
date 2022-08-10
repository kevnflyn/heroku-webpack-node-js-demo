import React from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation, useHistory } from 'react-router-dom'

import { login } from '../../../store/user/effects'
import { useNetworkState } from '../../../utils/redux'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationError } from '../../antd/notifications'
import FormWrapper from '../../form/FormWrapper'

const LoginForm = () => {
  const [form] = Form.useForm()

  const { t } = useTranslation()

  const { state } = useLocation()

  const history = useHistory()

  const onFinish = async results => {
    try {
      await login(results, history, state && state.backLocation)
    } catch (error) {
      NotificationError({
        message: error.message,
        description: 'Please try again.'
      })
    }
  }

  const { loading } = useNetworkState()

  return (
    <FormWrapper form={form} onFinish={onFinish}>
      <Form.Item
        name='email'
        rules={[{ required: true, message: t('Email required') }]}
      >
        <Input
          type='email'
          placeholder={t('Enter email')}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: t('Password required') }]}
      >
        <Input.Password
          placeholder={t('Enter password')}
        />
      </Form.Item>
      <Button
        type='primary'
        htmlType='submit'
        loading={loading.LOGIN}
      >
        {t('Login')}
      </Button>
    </FormWrapper>
  )
}

export default LoginForm
