import React from 'react'

import AntSpace from 'antd/es/space'
import './Space.less'

import style from './Space.module.less'

const Space = props => (
  <AntSpace {...props} className={style.space}/>
)

export default Space
