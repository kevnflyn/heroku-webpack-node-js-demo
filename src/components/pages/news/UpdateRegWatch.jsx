import React, { useCallback } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { updateRegWatch } from '../../../store/regulationWatch/effects'
import { parseQuery } from '../../../utils/queryString'
import { useNetworkState, useRegulationWatchState } from '../../../utils/redux'
import Button from '../../antd/Button'
import { NotificationSuccess, NotificationError } from '../../antd/notifications'

const UpdateRegWatch = () => {
  const { t } = useTranslation()

  const location = useLocation()

  const {
    offset,
    size,
    ...filter
  } = parseQuery(location.search)

  const { activeRegulationWatch } = useRegulationWatchState()

  const onClick = useCallback(async () => {
    try {
      await updateRegWatch(activeRegulationWatch.regulationWatchId, { filter })
      NotificationSuccess({ message: t('Saved search updated.') })
    } catch (error) {
      NotificationError({ message: t('Error updating saved search.') })
    }
  }, [
    t,
    activeRegulationWatch,
    filter
  ])

  const { loading } = useNetworkState()

  return (
    <Button
      block
      size='middle'
      onClick={onClick}
      type='default'
      loading={loading.CREATE_REGULATION_WATCH ||
        loading.REGULATION_WATCHES}
    >
      <EditOutlined/>
      {t('Update')}
    </Button>
  )
}

export default UpdateRegWatch
