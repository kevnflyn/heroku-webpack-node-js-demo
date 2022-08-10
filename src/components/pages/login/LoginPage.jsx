import React from 'react'

import ApplicationWrapperPublic from '../../global/ApplicationWrapperPublic'
import PageAlignment from '../../layout/PageAlignment'
import SectionFull from '../../layout/SectionFull'
import LoginWidget from './LoginWidget'

const LoginPage = () => {
  return (
    <ApplicationWrapperPublic showFooter={false}>
      <PageAlignment withVerticalPadding>
        <SectionFull
          color='transparent'
          size='partial'
        >
          <LoginWidget/>
        </SectionFull>
      </PageAlignment>
    </ApplicationWrapperPublic>
  )
}

export default LoginPage
