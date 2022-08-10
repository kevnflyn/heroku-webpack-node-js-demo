import React from 'react'

import ColDefault from './ColDefault'
import {
  xsColInTwos,
  smColInTwos,
  mdColInTwos,
  lgColInTwos
} from './layout'

const columnInTwos = {
  xs: xsColInTwos,
  sm: smColInTwos,
  md: mdColInTwos,
  lg: lgColInTwos
}

const ColumnInTwos = ({ children, ...props }) => (
  <ColDefault {...columnInTwos} {...props}>
    {children}
  </ColDefault>
)

export default ColumnInTwos
