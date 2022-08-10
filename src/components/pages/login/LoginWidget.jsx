import React from 'react'

import { Trans, useTranslation } from 'react-i18next'

import routes from '../../../routes'
import Space from '../../antd/Space'
import ColumnAlone from '../../layout/ColumnAlone'
import RowDefault from '../../layout/RowDefault'
import WidgetBox from '../../layout/WidgetBox'
import LinkUnderlined from '../../navigation/LinkUnderlined'
import Title from '../../typography/Title'
import LoginForm from './LoginForm'

const LoginWidget = () => {
  const { t } = useTranslation()
  return (
    <RowDefault gutter='small'>
      <ColumnAlone lg={{ span: 10, offset: 7 }}>
        <WidgetBox type='white' size='small'>
          <Space direction='vertical' size={16}>
            <Title level={2}>
              <span>{t('Log into your account')}</span>
            </Title>
            <LoginForm/>
            <div>
              <LinkUnderlined to={routes.passwordResetRequest}>
                {t('Forgotten your password?')}
              </LinkUnderlined>
            </div>
            <div>
              <Trans>
                {/* Watch out! Do not remove the non-breaking line space */}
                Have no account?
                &nbsp;
                <LinkUnderlined to={routes.register}>
                  Register here
                </LinkUnderlined>
              </Trans>
            </div>
          </Space>
        </WidgetBox>
      </ColumnAlone>
    </RowDefault>
  )
}

export default LoginWidget
