import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { requestPasswordReset } from '../../../store/user/effects'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationError } from '../../antd/notifications'
import FormWrapper from '../../form/FormWrapper'

const PasswordResetRequestForm = () => {
  const [form] = Form.useForm()
  const [isSuccesfulRequest, setIsSuccessfulRequest] = useState(false)
  const { t } = useTranslation()
  const onFinish = async results => {
    try {
      await requestPasswordReset(results)
      setIsSuccessfulRequest(true)
    } catch (error) {
      NotificationError({
        message: t('Password reset request failed'),
        description: error.message
      })
      console.error(error)
    }
  }

  if (isSuccesfulRequest) {
    return <p>{t('If this email address is in our system, we will send you an email at this address to complete the password reset.')}</p>
  }

  return (
    <FormWrapper form={form} onFinish={onFinish}>
      <Form.Item name='email' rules={[{ required: true, message: t('Email required') }]}>
        <Input type='email' placeholder='email'/>
      </Form.Item>
      <Button type='primary' htmlType='submit'>{t('Request password reset')}</Button>
    </FormWrapper>
  )
}

export default PasswordResetRequestForm
