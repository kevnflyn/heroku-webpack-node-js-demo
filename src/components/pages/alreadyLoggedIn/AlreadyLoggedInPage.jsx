import React from 'react'
import Col from '../../antd/Col'

import Row from '../../antd/Row'
import ApplicationWrapperPrivate from '../../global/ApplicationWrapperPrivate'
import AlreadyLoggedIn from './AlreadyLoggedIn'

const AlreadyLoggedInPage = () => {
  return (
    <ApplicationWrapperPrivate>
      <Row>
        <Col span={24}>
          <AlreadyLoggedIn/>
        </Col>
      </Row>
    </ApplicationWrapperPrivate>
  )
}

export default AlreadyLoggedInPage
