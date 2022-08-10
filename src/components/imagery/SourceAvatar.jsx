import React from 'react'

import sourceAbbreviationToImageSource from '../../maps/sourceAbbreviationToImageSource'
import Avatar from '../antd/Avatar'

const SourceAvatar = ({ source, size = 64 }) => (
  <Avatar
    shape='circle'
    src={sourceAbbreviationToImageSource[source]}
    style={{ border: '1px solid #ddd' }}
    alt={source}
    size={size}
  >
    {source}
  </Avatar>
)

export default SourceAvatar
