import React, { useCallback } from 'react'

import { enableRegulationWatchAlerts } from '../../../store/regulationWatch/effects'
import { NotificationError, NotificationSuccess } from '../../antd/notifications'
import Switch from '../../antd/Switch'

const RegulationWatchAlertsToggle = ({
  regulationWatchId,
  hasAlertsEnabled
}) => {
  const onChange = useCallback(async newHasAlertsEnabled => {
    try {
      await enableRegulationWatchAlerts(
        regulationWatchId,
        { hasAlertsEnabled: newHasAlertsEnabled }
      )
      NotificationSuccess({
        message: `
          Alerts have been ${newHasAlertsEnabled ? 'enabled' : 'disabled'}.
        `
      })
    } catch (error) {
      NotificationError({ message: error.message })
    }
  }, [regulationWatchId])

  return (
    <Switch
      checked={hasAlertsEnabled}
      onChange={onChange}
    />
  )
}

export default RegulationWatchAlertsToggle
