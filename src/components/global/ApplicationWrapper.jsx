import React from 'react'

import ApplicationContent from './ApplicationContent'
import ApplicationHeader from './ApplicationHeader'
import ApplicationLayout from './ApplicationLayout'

const ApplicationWrapper = ({
  children,
  renderFooter
}) => (
  <ApplicationLayout>
    <ApplicationHeader/>
    <ApplicationContent>
      {children}
    </ApplicationContent>
    {renderFooter && renderFooter()}
  </ApplicationLayout>
)

export default ApplicationWrapper
