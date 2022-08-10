import React from 'react'

import Tooltip from '../antd/Tooltip'
import Typography from '../antd/Typography'

const { Text } = Typography

const Truncate = ({ children, title, width }) => (
  <Tooltip title={title}>
    <Text
    style={{ width }}
    ellipsis={{ tooltip: true }}
    >
      {children}
    </Text>
  </Tooltip>
)

export default Truncate
