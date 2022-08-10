import React from 'react'

import useSetupForNewsPage from '../../../hooks/useSetupForNewsPage'
import { useUserState } from '../../../utils/redux'
import SpinnerCentred from '../../animation/SpinnerCentred'
import ApplicationWrapperPrivate from '../../global/ApplicationWrapperPrivate'
import PageAlignment from '../../layout/PageAlignment'
import NewsDashboard from './NewsDashboard'
import NewsWelcomeModal from './NewsWelcomeModal'

const NewsPage = () => {
  const { isNewsPageReady } = useSetupForNewsPage()
  const { userCompany } = useUserState()

  const wrapInApplicationWrapper = children => (
    <ApplicationWrapperPrivate>
      <PageAlignment withVerticalPadding>
        {children}
      </PageAlignment>
    </ApplicationWrapperPrivate>
  )

  if (!isNewsPageReady) {
    return wrapInApplicationWrapper(<SpinnerCentred/>)
  }

  if (userCompany && userCompany.completedOnboardingTimestamp) {
    return wrapInApplicationWrapper(<NewsDashboard/>)
  }

  return wrapInApplicationWrapper(<NewsWelcomeModal/>)
}

export default NewsPage
