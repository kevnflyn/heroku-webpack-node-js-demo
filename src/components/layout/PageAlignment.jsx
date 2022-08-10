import React from 'react'

import style from './PageAlignment.module.less'

const PageAlignment = ({ children, withVerticalPadding }) => (
  <div className={`
    ${style.pageAlignment}
    ${withVerticalPadding ? style.verticalPadding : ''}
  `}>
    {children}
  </div>
)

export default PageAlignment
