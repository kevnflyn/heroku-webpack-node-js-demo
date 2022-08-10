import React, { useCallback } from 'react'

import { DeleteFilled } from '@ant-design/icons'

import { requestDeleteRegWatch } from '../../../store/regulationWatch/effects'
import { useNetworkState } from '../../../utils/redux'
import Button from '../../antd/Button'
import Spin from '../../antd/Spin'

const DeleteRegulationWatch = ({ regulationWatchId, onDelete }) => {
  const { loading } = useNetworkState()

  const onClick = useCallback(async event => {
    try {
      event.stopPropagation()

      await requestDeleteRegWatch(regulationWatchId)

      if (onDelete) {
        onDelete()
      }
    } catch {
      console.error('Unable to complete watch deletion functionality.')
    }
  }, [regulationWatchId, onDelete])

  return (
    <Button border={false} type='gray'>
      {loading.DELETE_REGULATION_WATCH === regulationWatchId
        ? <Spin/>
        : <DeleteFilled onClick={onClick}/>}
    </Button>
  )
}

export default DeleteRegulationWatch
