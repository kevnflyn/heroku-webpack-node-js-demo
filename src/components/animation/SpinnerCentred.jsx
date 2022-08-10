import React from 'react'

import Flex from 'styled-flex-component'

import Space from '../antd/Space'
import Spin from '../antd/Spin'

const SpinnerCentred = () => (
  <Space direction='vertical' size={8}>
    <br/>
    <Flex width='100%' justifyCenter>
      <Spin/>
    </Flex>
    <br/>
  </Space>
)

export default SpinnerCentred
