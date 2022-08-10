import React from 'react'

import Select from '../antd/Select'
import Tag from '../antd/Tag'

const tagRender = ({
  label,
  closable,
  onClose,
  color = '#ccc'
}) => {
  const onPreventMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

const SelectMultipleChoice = ({ options, ...props }) => {
  return (
    <Select
      {...props}
      mode='multiple'
      showArrow
      tagRender={tagRender}
      style={{ width: '100%' }}
      options={options}
    />
  )
}

export default SelectMultipleChoice
