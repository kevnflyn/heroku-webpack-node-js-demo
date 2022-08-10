import React from 'react'

import ApplicationWrapperPrivate from '../../global/ApplicationWrapperPrivate'
import NewsWelcomeModal from '../news/NewsWelcomeModal'

const WelcomePage = () => {
  return (
    <ApplicationWrapperPrivate>
      <NewsWelcomeModal/>
    </ApplicationWrapperPrivate>
  )
}

export default WelcomePage
