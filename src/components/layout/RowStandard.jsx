import React from 'react'

import Row from '../antd/Row'

const RowStandard = ({
  multipleColumns: {
    xs = false,
    sm = false,
    md = true,
    lg = true
  } = {
    xs: false,
    sm: false,
    md: true,
    lg: true
  },
  ...props
}) => (
  <Row gutter={{
    xs: xs ? 0 : 0,
    sm: sm ? 0 : 0,
    md: md ? 16 : 0,
    lg: lg ? 32 : 0
  }} {...props}/>
)

export default RowStandard
