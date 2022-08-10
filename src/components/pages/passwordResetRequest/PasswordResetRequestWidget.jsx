import React from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import Col from '../../antd/Col'
import Space from '../../antd/Space'
import RowDefault from '../../layout/RowDefault'
import WidgetBox from '../../layout/WidgetBox'
import Title from '../../typography/Title'
import PasswordResetRequestForm from './PasswordResetRequestForm'

const PasswordResetRequestWidget = () => {
  const { t } = useTranslation()

  return (
    <WidgetBox type='white' size='small'>
      <RowDefault gutter='small'>
        <Col span={24}>
          <Flex>
            <Title level={2}>
              <span>{t('Password Reset Request')}</span>
            </Title>
          </Flex>
          <Space direction='vertical' size={16}>
            <PasswordResetRequestForm/>
          </Space>
        </Col>
      </RowDefault>
    </WidgetBox>
  )
}

export default PasswordResetRequestWidget
