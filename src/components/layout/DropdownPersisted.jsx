import React, { useState } from 'react'
import Dropdown from '../antd/Dropdown'

const DropdownPersisted = props => {
  const [visible, setVisible] = useState(props.visible)
  return (
    <Dropdown
      {...props}
      onVisibleChange={setVisible}
      visible={visible}
    />
  )
}

export default DropdownPersisted
