import React from 'react'

import ColDefault from './ColDefault'
import {
  xsColTwoThirds,
  smColTwoThirds,
  mdColTwoThirds,
  lgColTwoThirds
} from './layout'

const columnInTwos = {
  xs: xsColTwoThirds,
  sm: smColTwoThirds,
  md: mdColTwoThirds,
  lg: lgColTwoThirds
}

const ColumnInTwos = ({ children, ...props }) => (
  <ColDefault {...columnInTwos} {...props}>
    {children}
  </ColDefault>
)

export default ColumnInTwos
