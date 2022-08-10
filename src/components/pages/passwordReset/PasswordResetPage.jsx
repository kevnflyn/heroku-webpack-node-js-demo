import React, { useMemo, useState, useEffect } from 'react'

import { Trans, useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Flex from 'styled-flex-component'

import routes from '../../../routes'
import { postPasswordResetRequestValidation } from '../../../store/user/userService'
import ApplicationWrapperPublic from '../../global/ApplicationWrapperPublic'
import PageAlignment from '../../layout/PageAlignment'
import SectionFull from '../../layout/SectionFull'
import WidgetBox from '../../layout/WidgetBox'
import Link from '../../navigation/Link'
import Title from '../../typography/Title'
import PasswordResetWidget from './PasswordResetWidget'

const PasswordResetPage = () => {
  const { search } = useLocation()
  const token = useMemo(() => {
    const token = search.split('=')
    return token[1]
  }, [search])

  const [isValidSession, setIsValidSession] = useState(undefined)
  useEffect(() => {
    const checkSessionIsValid = async () => {
      try {
        const { isValidPasswordResetSession } = await postPasswordResetRequestValidation({ token })
        setIsValidSession(isValidPasswordResetSession)
      } catch (error) {
        console.error(error)
      }
    }
    checkSessionIsValid()
  }, [token])

  const { t } = useTranslation()

  return (
    <ApplicationWrapperPublic showFooter={false}>
      <PageAlignment withVerticalPadding>
        <SectionFull
          color='transparent'
          size='partial'
        >
          <Flex justifyCenter>
            {isValidSession === true && <PasswordResetWidget token={token}/>}
            {isValidSession === false && (
              <WidgetBox type='white' size='small'>
                <Title level={2}>
                  <span>{t('Password Reset Expired')}</span>
                </Title>
                <Trans>
                  Your password reset session has expired or is invalid.
                  Go back to the <Link to={routes.login}>login page</Link>
                  to try again.
                </Trans>
              </WidgetBox>
            )}
          </Flex>
        </SectionFull>
      </PageAlignment>
    </ApplicationWrapperPublic>
  )
}

export default PasswordResetPage
