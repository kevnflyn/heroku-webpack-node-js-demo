import React, { useState } from 'react'

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Flex from 'styled-flex-component'

import Checkbox from '../antd/Checkbox'
import Space from '../antd/Space'
import style from './CheckboxDisplay.module.less'

const CheckboxDisplay = ({ children, label, initialState = false }) => {
  const [display, setDisplay] = useState(initialState)
  const onChange = ({ target: { checked } }) => { setDisplay(checked) }
  return (
    <Space className={style.container} direction='vertical' size={16}>
      <Flex>
        <Checkbox onChange={onChange}>
          {display ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
          {' '}
          {label}
        </Checkbox>
      </Flex>
      <div className={display ? '' : style.hidden}>
        {children}
      </div>
    </Space>
  )
}

export default CheckboxDisplay
