import React from 'react'

import Row from '../antd/Row'

const gutterOptions = {
  'very-small': [4, 4],
  small: [8, 16],
  medium: [16, 16],
  large: [32, 32],
  'very-large': [64, 64]
}

const RowDefault = ({
  gutter = 'small',
  gutterCustom,
  ...props
}) => (
  <Row {...props} gutter={gutterCustom || gutterOptions[gutter]}/>
)

export default RowDefault
