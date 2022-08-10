import React from 'react'

import { SaveOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useRegulationWatchState } from '../../../utils/redux'
import RegulationWatchMenu from './RegulationWatchMenu'
import styles from './RegulationWatchMenuWidget.module.less'
import RegulationWatchWidget from './RegulationWatchWidget'
import WidgetTooltipTitle from './WidgetTooltipTitle'

const RegulationWatchMenuWidget = () => {
  const { t } = useTranslation()
  const { regulationWatches } = useRegulationWatchState()

  return (
    <RegulationWatchWidget
      type='gray'
      sizeH='full'
      padding={null}
      title={
        <div className={styles.title}>
          <WidgetTooltipTitle
            alignCenter
            icon={<SaveOutlined/>}
            widgetTitle={t('Saved searches')}
            tooltipTitle={t('Save your searches for later. You can activate or delete a search.')}
            mode='horizontal'
          />
        </div>
      }
      loading={!regulationWatches}
    >
      <div className={styles.regulationWatchMenuWidget}>
        <RegulationWatchMenu mode='vertical'/>
      </div>
    </RegulationWatchWidget>
  )
}

export default RegulationWatchMenuWidget
