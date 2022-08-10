import React, { useCallback } from 'react'

import { SearchOutlined } from '@ant-design/icons'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { setActiveRegulationWatch } from '../../../store/regulationWatch/effects'
import { useRegulationWatchState } from '../../../utils/redux'
import Switch from '../../antd/Switch'

const RegulationWatchActiveSwitch = ({ regulationWatch }) => {
  const { activeRegulationWatch } = useRegulationWatchState()
  const { loadInfiniteNewsFromStart } = useInfiniteNews()

  const onChange = useCallback(checked => {
    setActiveRegulationWatch(checked ? regulationWatch : null)
    loadInfiniteNewsFromStart(checked ? regulationWatch.filter : {})
  }, [regulationWatch, loadInfiniteNewsFromStart])

  return (
    <Switch
      checked={activeRegulationWatch &&
        activeRegulationWatch.regulationWatchId ===
        regulationWatch.regulationWatchId}
      onChange={onChange}
      checkedChildren={<SearchOutlined/>}
      unCheckedChildren={<SearchOutlined/>}
    />

  )
}

export default RegulationWatchActiveSwitch
