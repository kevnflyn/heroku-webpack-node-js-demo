import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import routes from '../../../routes'
import Space from '../../antd/Space'
import ColumnAlone from '../../layout/ColumnAlone'
import RowDefault from '../../layout/RowDefault'
import WidgetBox from '../../layout/WidgetBox'
import LinkUnderlined from '../../navigation/LinkUnderlined'
import Text from '../../typography/Text'
import Title from '../../typography/Title'
import RegistrationForm from './RegistrationForm'

const RegistrationWidget = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const { t } = useTranslation()
  return (
    <RowDefault gutter="small">
      <ColumnAlone lg={{ span: 10, offset: 7 }}>
        <WidgetBox type="white" size="small">
          <Flex column justifyCenter>
            <Space direction="vertical" size={16}>
              <Title level={2}>
                <span>{t('Sign up to Phare')}</span>
              </Title>
              {isRegistered
                ? <>
                  <Title level={5} alignCenter>
                    {t('Your registration was successful.')}
                  </Title>
                  <Text>
                    {t("There's just one more step. We've sent you a confirmation email to verify your email address.")}
                  </Text>
                </>
                : <>
                  <Text type="secondary">
                    {t('There are two steps. 1st sign up. 2nd Confirm email.')}
                  </Text>
                  <RegistrationForm
                    onRegistered={() => setIsRegistered(true)}
                  />
                  <LinkUnderlined to={routes.login}>
                    {t('Already registered? Login here')}
                  </LinkUnderlined>
                </>}
            </Space>
          </Flex>
        </WidgetBox>
      </ColumnAlone>
    </RowDefault>
  )
}

export default RegistrationWidget
