import React from 'react'

import { FilterOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { useRegulationWatchState } from '../../../utils/redux'
import NewsSearchBar from '../../global/NewsSearchBar'
import ColDefault from '../../layout/ColDefault'
import RowDefault from '../../layout/RowDefault'
import RegulationWatchWidget from '../regwatch/RegulationWatchWidget'
import WidgetTooltipTitle from '../regwatch/WidgetTooltipTitle'
import CreateRegWatch from './CreateRegWatch'
import FiltersModal from './FiltersModal'
import NewsDatePublishedRangeField from './NewsDatePublishedRangeField'
import ResetNewsFeedButton from './ResetNewsFeedButton'
import SearchNewsButton from './SearchNewsButton'
import UpdateRegWatch from './UpdateRegWatch'

const NewsFeedFiltersWidget = () => {
  const { t } = useTranslation()

  const { activeRegulationWatch } = useRegulationWatchState()

  return (
    <RegulationWatchWidget
      type='gray'
      sizeH='full'
      title={
        <WidgetTooltipTitle
          alignCenter
          icon={<FilterOutlined/>}
          widgetTitle={t('Search filters')}
          tooltipTitle={t('Search compliance by filtering on the Phare database.')}
        />
      }
    >
      <Flex column style={{
        gap: '16px',
        marginTop: '12px',
        marginBottom: '12px'
      }}>
        <NewsSearchBar bordered/>
        <NewsDatePublishedRangeField bordered/>
        <FiltersModal/>
        <RowDefault gutterCustom={[8, 0]} style={{ margin: 0 }}>
          <ColDefault span={12}>
            <SearchNewsButton/>
          </ColDefault>
          <ColDefault span={12}>
            <ResetNewsFeedButton block/>
          </ColDefault>
        </RowDefault>
        <RowDefault gutterCustom={[8, 0]} style={{ margin: 0 }}>
          {activeRegulationWatch
            ? <>
                <ColDefault span={12}>
                  <CreateRegWatch/>
                </ColDefault>
                <ColDefault span={12}>
                  <UpdateRegWatch/>
                </ColDefault>
              </>
            : <ColDefault span={12}>
                <CreateRegWatch query={activeRegulationWatch}/>
              </ColDefault>
          }
        </RowDefault>
      </Flex>
    </RegulationWatchWidget>
  )
}

export default NewsFeedFiltersWidget
