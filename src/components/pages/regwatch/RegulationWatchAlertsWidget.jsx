import { BellOutlined } from '@ant-design/icons'
import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { useRegulationWatchState } from '../../../utils/redux'
import RegulationWatchAlertsToggle from './RegulationWatchAlertsToggle'
import RegulationWatchAlertTimes from './RegulationWatchAlertTimes'
import RegulationWatchWidget from './RegulationWatchWidget'
import WidgetTooltipTitle from './WidgetTooltipTitle'

const RegulationWatchAlertsWidget = () => {
  const { activeRegulationWatch } = useRegulationWatchState()
  const { t } = useTranslation()

  const {
    hasAlertsEnabled,
    regulationWatchId,
    alertTimeMonday,
    alertTimeTuesday,
    alertTimeWednesday,
    alertTimeThursday,
    alertTimeFriday,
    alertTimeSaturday,
    alertTimeSunday
  } = useMemo(() => activeRegulationWatch || {}, [activeRegulationWatch])

  const dailAlertTimes = useMemo(() => ({
    alertTimeMonday,
    alertTimeTuesday,
    alertTimeWednesday,
    alertTimeThursday,
    alertTimeFriday,
    alertTimeSaturday,
    alertTimeSunday
  }), [
    alertTimeMonday,
    alertTimeTuesday,
    alertTimeWednesday,
    alertTimeThursday,
    alertTimeFriday,
    alertTimeSaturday,
    alertTimeSunday
  ])

  return (
  <RegulationWatchWidget
    title={
      <WidgetTooltipTitle
        alignCenter
        icon={<BellOutlined/>}
        widgetTitle={t('Alerts')}
        tooltipTitle={t('Here you can change the timing of your email alerts. Enable a day and then pick a time. Enable/disable all alerts using the toggle on the right.')}
        buttons={<Flex>
          {activeRegulationWatch && (
            <RegulationWatchAlertsToggle
              hasAlertsEnabled={hasAlertsEnabled}
              regulationWatchId={regulationWatchId}
            />
          )}
        </Flex>}
      />
    }
    loading={!activeRegulationWatch}
  >
    {activeRegulationWatch && (
      <RegulationWatchAlertTimes
        dailyAlertTimes={dailAlertTimes}
        hasAlertsEnabled={hasAlertsEnabled}
        regulationWatchId={regulationWatchId}
      />
    )}
  </RegulationWatchWidget>
  )
}

export default RegulationWatchAlertsWidget
