import React, { useEffect, useState } from 'react'

import { useRegulationWatchPage } from '../../../hooks/useRegulationWatchPage'
import ApplicationWrapperPrivate from '../../global/ApplicationWrapperPrivate'
import PageAlignment from '../../layout/PageAlignment'
import RegulationWatchPageContent from './RegulationWatchPageContent'

const RegulationWatchPage = () => {
  const [isPageReady, setIsPageReady] = useState(false)

  const { setupRegulationWatchPage } = useRegulationWatchPage()

  useEffect(() => {
    /** Script be run once to set up the page. */

    const initialisePage = async () => {
      setupRegulationWatchPage()
      setIsPageReady(true)
    }
    initialisePage()
  }, [])

  return (
    <ApplicationWrapperPrivate>
      <PageAlignment withVerticalPadding>
        <RegulationWatchPageContent isPageReady={isPageReady}/>
      </PageAlignment>
    </ApplicationWrapperPrivate>
  )
}

export default RegulationWatchPage
