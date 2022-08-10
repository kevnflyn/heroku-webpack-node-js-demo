import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { useRegulationWatchState } from '../../../utils/redux'
import RegulationWatchTitleField from './RegulationWatchTitleField'
import RegulationWatchWidget from './RegulationWatchWidget'
import WidgetTooltipTitle from './WidgetTooltipTitle'

const RegulationWatchTitleWidget = () => {
  const { t } = useTranslation()

  const { activeRegulationWatch } = useRegulationWatchState()

  const titlePlaceholder = useMemo(() => t('Regulation title'), [t])

  return (
    <RegulationWatchWidget
      loading={!activeRegulationWatch}
      title={activeRegulationWatch && activeRegulationWatch.name
        ? (
            <WidgetTooltipTitle
              alignStart
              icon={
                <div style={{ lineHeight: '16px', fontSize: '16px' }}>N</div>
              }
              widgetTitle={<RegulationWatchTitleField/>}
              tooltipTitle={t('Change the name of the currently selected regulation watch by clicking on the title or edit icon.')}
            />
          )
        : titlePlaceholder
      }
    />
  )
}

export default RegulationWatchTitleWidget
