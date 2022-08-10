import React from 'react'

import { withTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { signupToWaitingList } from '../../store/user/effects'
import Button from '../antd/Button'
import Form from '../antd/Form'
import Input from '../antd/Input'
import { NotificationError } from '../antd/notifications'
import FormWrapper from '../form/FormWrapper'

const SimpleSubscribeForm = ({
  t,
  disabled,
  column,
  callToAction = t('Subscribe')
}) => {
  const [form] = Form.useForm()

  const onFinish = async formData => {
    try {
      await signupToWaitingList(formData)
    } catch (error) {
      NotificationError({
        message: t('User subscription'),
        description: Array.isArray(error) ? error[0].message : error.message || error.statusText
      })
    }
  }

  return (
    <FormWrapper form={form} onFinish={onFinish}>
      <Flex column={column} style={{ width: '100%', gap: 8 }}>
        <Form.Item
          name='email'
          hasFeedback
          rules={[
            { required: true, message: t('Email required') },
            { type: 'email', message: t('Email invalid') }
          ]}
          style={{ width: '100%' }}
        >
          <Input
            disabled={disabled}
            size='large'
            type='email'
            placeholder={t('Email')}/>
        </Form.Item>
        <Button
          htmlType='submit'
          size='large'
          type='opposite'
          style={{ width: '100%' }}
          disabled={disabled}
        >
          {callToAction}
        </Button>
      </Flex>
    </FormWrapper>
  )
}

export default withTranslation(SimpleSubscribeForm)
