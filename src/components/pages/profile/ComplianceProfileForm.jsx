import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { userCompanyApi } from '../../../endpoints'
import useUpdateUserCompany from '../../../hooks/useUpdateUserCompany'
import Form from '../../antd/Form'
import Space from '../../antd/Space'
import ComplianceAuthoritiesField from './ComplianceAuthoritiesField'
import CountriesOperatingField from './CountriesOperatingField'
import ProfileSetting from './ProfileSetting'

const ComplianceProfileForm = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { updateUserCompanyHandler } = useUpdateUserCompany()
  const onFinish = async formData => {
    await updateUserCompanyHandler(formData)
  }

  const [userCompany, setuserCompany] = useState(null)
  useEffect(() => {
    const fetchcompany = async () => {
      const response = await fetch(userCompanyApi)
      const { userCompany } = await response.json()
      setuserCompany(userCompany)
    }
    fetchcompany()
  }, [])

  if (!userCompany) {
    return null
  }

  return (
    <ProfileSetting
      direction='vertical'
      form={form}
      onFinish={onFinish}
      initialValues={userCompany}
      title={t('This information is used to generate your news feed. In order to generate news relevant to you, we need to collect some general information about your business, for example where you operate and which industries you work in. Using this data, we can do all the heavy lifting for you and find what your business needs.')}
    >
      <Space direction='vertical' size={16}>
        <ComplianceAuthoritiesField/>
        <CountriesOperatingField/>
      </Space>
    </ProfileSetting>
  )
}

export default ComplianceProfileForm
