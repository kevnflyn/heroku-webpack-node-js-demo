import React from 'react'

import ColDefault from './ColDefault'
import {
  xsColSingle,
  smColSingle,
  mdColSingle,
  lgColSingle
} from './layout'

const singleColumn = {
  xs: xsColSingle,
  sm: smColSingle,
  md: mdColSingle,
  lg: lgColSingle
}

const ColumnAlone = ({ children, ...props }) => (
  <ColDefault {...singleColumn} {...props}>
    {children}
  </ColDefault>
)

export default ColumnAlone
