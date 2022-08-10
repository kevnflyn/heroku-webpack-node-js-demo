import React from 'react'

import ApplicationWrapperPublic from '../../global/ApplicationWrapperPublic'
import PageAlignment from '../../layout/PageAlignment'
import SectionFull from '../../layout/SectionFull'
import RegistrationWidget from './RegistrationWidget'

const RegistrationPage = () => {
  return (
    <ApplicationWrapperPublic showFooter={false}>
      <PageAlignment withVerticalPadding>
        <SectionFull
          color='transparent'
          size='partial'
        >
          <RegistrationWidget/>
        </SectionFull>
      </PageAlignment>
    </ApplicationWrapperPublic>
  )
}

export default RegistrationPage
