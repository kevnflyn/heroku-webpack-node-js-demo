import React from 'react'

import Flex from 'styled-flex-component'

import Col from '../antd/Col'
import Row from '../antd/Row'
import BrandIconWhite from '../imagery/BrandIconWhite'
import SectionFull from '../layout/SectionFull'
import Visible from '../layout/Visible'

const colSpanFull = {
  xs: { span: 24, offset: 0 },
  sm: { span: 18, offset: 3 },
  md: { span: 14, offset: 5 },
  lg: { span: 22, offset: 1 }
}

const HomeSlideLanding = () => (
  <SectionFull>
    <Flex
      justifyCenter
      alignCenter
      style={{ height: '100%' }}
    >
      <Row>
        <Col {...colSpanFull}>
          <Flex justifyCenter alignCenter>
            <Visible hide={['lg']}>
              <BrandIconWhite size='192px'/>
            </Visible>
            <Visible hide={['xs']} display={['lg']}>
              <BrandIconWhite size='256px'/>
            </Visible>
          </Flex>
        </Col>
      </Row>
    </Flex>
  </SectionFull>
)

export default HomeSlideLanding
