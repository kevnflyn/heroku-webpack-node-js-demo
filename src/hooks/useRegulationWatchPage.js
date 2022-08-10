import { useCallback } from 'react'

import { useLocation } from 'react-router-dom'

import { requestRegWatches, setActiveRegulationWatch } from '../store/regulationWatch/effects'

export const useRegulationWatchPage = () => {
  const location = useLocation()

  const setupRegulationWatchPage = useCallback(async () => {
    /** Request all regulation watch data. */
    const regulationWatches = await requestRegWatches()
    if (location.state && location.state.activeRegulationWatch) {
      setActiveRegulationWatch(location.state.activeRegulationWatch)
    }

    /** Set active regulation watch if hash provided in URL. */
    const substring = typeof location.hash === 'string'
      ? location.hash.substring(1, location.hash.length)
      : ''
    const hashNumberId = parseInt(substring)
    if (!Number.isNaN(hashNumberId)) {
      const activeRegulationWatch = regulationWatches.find(reg => (
        reg.regulationWatchId === hashNumberId
      ))
      if (activeRegulationWatch) {
        setActiveRegulationWatch(activeRegulationWatch)
      }
    }
  }, [])

  return {
    setupRegulationWatchPage
  }
}
