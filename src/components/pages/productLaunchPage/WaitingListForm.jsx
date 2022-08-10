import React from 'react'

import { Trans, useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { signupToWaitingList } from '../../../store/user/effects'
import { useUserState } from '../../../utils/redux'
import Button from '../../antd/Button'
import Col from '../../antd/Col'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationError } from '../../antd/notifications'
import Row from '../../antd/Row'
import Space from '../../antd/Space'
import Typography from '../../antd/Typography'
import FormWrapper from '../../form/FormWrapper'
import BoxCentred from '../../layout/BoxCentred'
import Title from '../../typography/Title'
import styles from './WaitingListForm.module.less'

const { Paragraph } = Typography

const WaitingListForm = () => {
  const { t } = useTranslation()

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

  const { hasSubscribed } = useUserState()

  return (
    <>
      <div className={`
        ${styles.confirmMessage}
        ${hasSubscribed && styles.confirmMessageVisible}
      `}>
        <BoxCentred style={{ width: '100%', position: 'relative' }}>
          <Title level={1}>
            {t('Sign up confirmed!')}
          </Title>
          <Title level={4}>
            {t("You'll hear from us soon.")}
          </Title>
        </BoxCentred>
      </div>
      <div className={(hasSubscribed && styles.formHidden) || ''}>
        <BoxCentred>
          <Space size='large' direction='vertical' style={{ width: '100%' }}>
            <Flex column justifyCenter>
              <Title level={1} style={{ textAlign: 'center' }}>
                {t('Join our waiting list')}
              </Title>
              <Title level={4} style={{ textAlign: 'center' }}>
                <Trans>
                  Be the first to find out when
                  <br/>
                  our beta version is released.
                  <br/>
                  What you can expect:
                </Trans>
              </Title>
              <br/>
              <Paragraph style={{ textAlign: 'center' }}>
                <Flex column>
                  <Trans>
                    <b>Tailored regulatory news feeds and alerts</b>
                    <span>·</span>
                    <b>Smart summaries backed by AI</b>
                    <span>·</span>
                    <b>Downloadable and shareable content</b>
                  </Trans>
                </Flex>
              </Paragraph>
            </Flex>
            <FormWrapper form={form} onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name='firstname'
                    rules={[{ required: true, message: t('First name required') }]}
                  >
                    <Input type='string' placeholder={t('Firstname')}/>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name='lastname'
                    rules={[{ required: true, message: t('Last name required') }]}
                  >
                    <Input type='string' placeholder={t('Surname')}/>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name='company'
                    rules={[
                      { required: true, message: t('Company required') }
                    ]}
                  >
                    <Input type='text' placeholder={t('Company')}/>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name='title'
                    rules={[
                      { required: true, message: t('Title required') }
                    ]}
                  >
                    <Input type='text' placeholder={t('Title')}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
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
                </Col>
              </Row>

              <Button type='primary' htmlType='submit'>
                {t('Subscribe')}
              </Button>
            </FormWrapper>
          </Space>
        </BoxCentred>
      </div>
    </>
  )
}

export default WaitingListForm
