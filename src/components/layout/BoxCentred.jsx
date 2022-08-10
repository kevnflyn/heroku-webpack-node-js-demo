import React from 'react'

import Card from '../antd/Card'
import Col from '../antd/Col'
import Row from '../antd/Row'

const BoxCentred = ({ children }) => (
  <Row>
    <Col xs={24} lg={{ offset: 4, span: 16 }}>
      <Card>
        {children}
      </Card>
    </Col>
  </Row>
)

export default BoxCentred
