import React from 'react'

import Button from 'components/antd/Button'
import Space from 'components/antd/Space'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Flex from 'styled-flex-component'

import { useRegulationWatchState } from '../../../utils/redux'
import { goToNews } from '../../../utils/routing'
import SpinnerCentred from '../../animation/SpinnerCentred'
import ColDefault from '../../layout/ColDefault'
import RowDefault from '../../layout/RowDefault'
import Text from '../../typography/Text'
import Title from '../../typography/Title'
import RegulationWatchDashboard from './RegulationWatchDashboard'

const RegulationWatchPageContent = ({ isPageReady }) => {
  const { t } = useTranslation()
  const { regulationWatches } = useRegulationWatchState()
  const history = useHistory()

  if (!isPageReady) {
    return <SpinnerCentred/>
  }

  if (regulationWatches.length === 0) {
    return (
      <RowDefault gutter='medium'>
        <ColDefault {...{
          xs: { span: 24 },
          md: { span: 12, offset: 6 }
        }}>
          <Space direction='vertical'>
            <Title level={4}>
              {t('No regulation watches, but that\'s not where the story ends...')}
            </Title>
            <Text>
              {t('To create a regulation watch, visit the search page.')}
            </Text>
          </Space>
          <Flex column style={{ marginTop: '16px' }}>
            <Button
              onClick={() => goToNews(history)}
              type='primary'
              size='large'
            >
              {t('Go to search')}
            </Button>
          </Flex>
        </ColDefault>
      </RowDefault>
    )
  }

  return <RegulationWatchDashboard/>
}

export default RegulationWatchPageContent
