import React from 'react'

import AntCheckbox from 'antd/es/checkbox'
import './Checkbox.less'

import style from './Checkbox.module.less'

const Checkbox = props => <AntCheckbox {...props}/>

const CheckboxGroup = props => (
  <div className={style.checkbox}>
    <AntCheckbox.Group {...props}/>
  </div>
)

Checkbox.Group = CheckboxGroup

export default Checkbox
