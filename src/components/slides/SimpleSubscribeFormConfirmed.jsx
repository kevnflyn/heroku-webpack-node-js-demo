
import React from 'react'

import { useTranslation } from 'react-i18next'

import { useUserState } from '../../utils/redux'
import Visible from '../layout/Visible'
import Title from '../typography/Title'
import SimpleSubscribeForm from './SimpleSubscribeForm'

const Message = ({ newSubscriber }) => {
  const { t } = useTranslation()
  return (
  <Title color='white' level={3}>
    {t("Your subscription is confirmed! We'll notify at {{subscriberEmail}}",
      { subscriberEmail: newSubscriber.email })}
  </Title>
  )
}

const SimpleSubscribeFormConfirmed = props => {
  const { hasSubscribed, newSubscriber } = useUserState()
  if (hasSubscribed) {
    return (
      <>
        <Visible hide={['md']}>
          <div style={{ textAlign: 'left' }}>
            <Message newSubscriber={newSubscriber}/>
          </div>
        </Visible>
        <Visible hide={['xs']} display={['md']}>
          <div style={{ textAlign: 'center' }}>
            <Message newSubscriber={newSubscriber}/>
          </div>
        </Visible>
      </>
    )
  }
  return (
    <SimpleSubscribeForm {...props}/>
  )
}

export default SimpleSubscribeFormConfirmed
