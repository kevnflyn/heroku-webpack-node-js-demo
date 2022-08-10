import React from 'react'

import Flex from 'styled-flex-component'

import ApplicationWrapperPublic from '../../global/ApplicationWrapperPublic'
import PageAlignment from '../../layout/PageAlignment'
import SectionFull from '../../layout/SectionFull'
import PasswordResetRequestWidget from './PasswordResetRequestWidget'

const PasswordResetRequestPage = () => {
  return (
    <ApplicationWrapperPublic showFooter={false}>
      <PageAlignment withVerticalPadding>
        <SectionFull
          color='transparent'
          size='partial'
        >
          <Flex justifyCenter>
            <PasswordResetRequestWidget/>
          </Flex>
        </SectionFull>
      </PageAlignment>
    </ApplicationWrapperPublic>
  )
}

export default PasswordResetRequestPage
