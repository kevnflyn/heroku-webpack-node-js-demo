import React, { useEffect } from 'react'

import Paragraph from 'antd/es/typography/Paragraph'
import { useTranslation } from 'react-i18next'

import useModal from '../../../hooks/useModal'
import useUpdateUserCompany from '../../../hooks/useUpdateUserCompany'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Modal from '../../antd/Modal'
import Space from '../../antd/Space'
import Steps from '../../antd/Steps'
import FormWrapper from '../../form/FormWrapper'
import CompanyNameField from '../profile/CompanyNameField'
import ComplianceAuthoritiesField from '../profile/ComplianceAuthoritiesField'
import CountriesOperatingField from '../profile/CountriesOperatingField'
import JobTitleField from '../profile/JobTitleField'
import { NotificationSuccess } from '../../antd/notifications'

const { Step } = Steps

const NewsWelcomeModal = () => {
  const {
    visible,
    showModal,
    hideModal
  } = useModal(false)

  useEffect(() => {
    setTimeout(() => {
      showModal()
    }, [1000])
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const [current, setCurrent] = React.useState(0)
  const next = () => {
    setCurrent(current + 1)
  }

  const { t } = useTranslation()

  const [form] = Form.useForm()

  const { updateUserCompanyHandler } = useUpdateUserCompany()

  const postAlerts = async formData => {
    await updateUserCompanyHandler(formData)
    next()
  }
  const submitAlerts = () => {
    form.submit()
  }
  const postCompany = async formData => {
    await updateUserCompanyHandler({
      ...formData,
      completedOnboardingTimestamp: (new Date()).toISOString()
    })
    hideModal()
    NotificationSuccess({
      message: t('User profile complete')
    })
  }
  const submitCompany = () => {
    form.submit()
  }

  const steps = [
    {
      title: 'Welcome',
      content: (
        <>
          <Paragraph>
            <b>{t('Your account has been confirmed.')}</b>
          </Paragraph>
          <Paragraph>
            {t('We are happy to welcome you to the Phare application. You have been given full access, including to the news feed, AI-generated summaries and more.')}
          </Paragraph>
          <Paragraph>
            {t('To start using the application, please continue through the final setup stages so we can create your user profile. This data will be used to generate your personal news and alerts.')}
          </Paragraph>
        </>
      )
    },
    {
      title: t('Location'),
      content: (
        <FormWrapper
          form={form}
          onFinish={postAlerts}
        >
          <Space direction='vertical' size={16}>
            <ComplianceAuthoritiesField/>
            <CountriesOperatingField/>
          </Space>
        </FormWrapper>
      )
    },
    {
      title: t('Company info'),
      content: (
        <FormWrapper
          form={form}
          onFinish={postCompany}
        >
          <Space direction='vertical' size={16}>
            <CompanyNameField/>
            <JobTitleField/>
          </Space>
        </FormWrapper>
      )
    }
  ]

  return (
    <Modal
      visible={visible}
      closable={false}
      maskClosable={false}
      footer={null}
      mask
    >
      <Space direction='vertical' size={16}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current === 0 && (
            <Button type="primary" onClick={next}>
              {t('Next')}
            </Button>
          )}
          {current === 1 && (
            <Button type="primary" onClick={submitAlerts}>
              {t('Submit alerts settings')}
            </Button>
          )}
          {current === 2 && (
            <Button type="primary" onClick={submitCompany}>
              {t('Submit company info')}
            </Button>
          )}
        </div>
      </Space>
    </Modal>
  )
}

export default NewsWelcomeModal
