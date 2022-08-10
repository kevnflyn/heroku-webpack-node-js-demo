import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import Spin from 'antd/es/spin'
import './Spin.less'

const Spinner = props => (
  <Spin {...props} indicator={<LoadingOutlined spin/>}/>
)

export default Spinner
