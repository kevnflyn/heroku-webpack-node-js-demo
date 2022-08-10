import React from 'react'

import ApplicationFooter from './ApplicationFooter'
import ApplicationWrapper from './ApplicationWrapper'

const ApplicationWrapperPublic = ({ children, showFooter = true }) => (
  <ApplicationWrapper
    renderFooter={showFooter && (() => <ApplicationFooter/>)}
  >
    {children}
  </ApplicationWrapper>
)

export default ApplicationWrapperPublic
