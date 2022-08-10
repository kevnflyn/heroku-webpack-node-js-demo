import React from 'react'

import ColDefault from './ColDefault'
import {
  xsColOneThird,
  smColOneThird,
  mdColOneThird,
  lgColOneThird
} from './layout'

const columnInTwos = {
  xs: xsColOneThird,
  sm: smColOneThird,
  md: mdColOneThird,
  lg: lgColOneThird
}

const ColumnInTwos = ({ children, ...props }) => (
  <ColDefault {...columnInTwos} {...props}>
    {children}
  </ColDefault>
)

export default ColumnInTwos
