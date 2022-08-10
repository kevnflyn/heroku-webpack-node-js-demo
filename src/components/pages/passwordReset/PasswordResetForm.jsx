import React from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { postPasswordReset } from '../../../store/user/userService'
import { goToLogin } from '../../../utils/routing'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationSuccess, NotificationError } from '../../antd/notifications'
import Typography from '../../antd/Typography'
import FormWrapper from '../../form/FormWrapper'

const Paragraph = Typography

const PasswordResetForm = ({ token }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { t } = useTranslation()
  const onFinish = async ({ password }) => {
    try {
      await postPasswordReset({ password, token })
      goToLogin(history)
      NotificationSuccess({
        message: t('Password reset successful')
      })
    } catch (error) {
      NotificationError({
        message: error.message || t('Password reset error')
      })
      console.error(error)
    }
  }

  return (
    <>
      <Paragraph>{t('Please choose a different password from your previous one.')}</Paragraph>
      <br/>
      <FormWrapper form={form} onFinish={onFinish}>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            { required: true, message: t('Password required') },
            { min: 8, message: t('Min. 8 characters') },
            { max: 16, message: t('Max. 16 characters') }
          ]}
        >
          <Input.Password placeholder={'Enter password'} />
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
                return Promise.reject(new Error('Passwords don\'t match'))
              }
            })
          ]}
        >
          <Input.Password placeholder={t('Confirm Password')} />
        </Form.Item>

        <Button type='primary' htmlType='submit'>{t('Reset password')}</Button>
      </FormWrapper>
    </>
  )
}

export default PasswordResetForm
