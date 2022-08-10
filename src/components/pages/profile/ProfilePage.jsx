import React from 'react'

import { useTranslation } from 'react-i18next'

import Card from '../../antd/Card'
import Space from '../../antd/Space'
import ApplicationWrapperPrivate from '../../global/ApplicationWrapperPrivate'
import ColDefault from '../../layout/ColDefault'
import PageAlignment from '../../layout/PageAlignment'
import PageTitle from '../../layout/PageTitle'
import RowDefault from '../../layout/RowDefault'
import Title from '../../typography/Title'
import ComplianceAlertsForm from './ComplianceAlertsForm'
import ComplianceProfileForm from './ComplianceProfileForm'
import UserLocaleForm from './UserLocaleForm'

const colSettings = {
  xs: { span: 24, offset: 0 },
  sm: { span: 18, offset: 3 },
  md: { span: 16, offset: 4 }
}

const ProfileSettingLayout = ({ Setting }) => (
  <RowDefault gutter='medium'>
    <ColDefault {...colSettings}>
      <Card>
        <Setting/>
      </Card>
    </ColDefault>
  </RowDefault>
)

const ProfilePage = () => {
  const { t } = useTranslation()
  return (
    <ApplicationWrapperPrivate>
      <PageAlignment withVerticalPadding>
        <PageTitle title={t('Profile Settings')}/>
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          {/* <ProfileSettingLayout
            Setting={() => (
              <>
                <Title level={3}>Personal info</Title>
                <UserInfoForm/>
                <UserEmailForm/>
                <UserPasswordForm/>
              </>
            )}
          /> */}
          <ProfileSettingLayout
            Setting={() => (
              <>
                <Title level={3}>{t('Compliance settings')}</Title>
                <ComplianceProfileForm/>
              </>
            )}
          />
          <ProfileSettingLayout
            Setting={() => (
              <>
                <Title level={3}>{t('Alerts setting')}</Title>
                <ComplianceAlertsForm/>
              </>
            )}
          />
          <ProfileSettingLayout
            Setting={() => (
              <>
                <Title level={3}>{t('Language setting')}</Title>
                <UserLocaleForm/>
              </>
            )}
          />
        </Space>
      </PageAlignment>
    </ApplicationWrapperPrivate>
  )
}

export default ProfilePage
