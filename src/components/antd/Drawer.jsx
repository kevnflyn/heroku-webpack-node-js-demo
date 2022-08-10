import React from 'react'

import AntDrawer from 'antd/es/drawer'

import { isMobile, isTablet } from '../../utils/responsive'

import './Drawer.less'

const getDrawerWidth = col => {
  if (isMobile()) {
    return '100%'
  }

  if (isTablet()) {
    return 480
  }

  return `${(col / 24) * 100}%`
}

const Drawer = ({
  responsiveColWidth,
  ...props
}) => (
  <AntDrawer
    {...props}
    width={getDrawerWidth(responsiveColWidth)}
  />
)

export default Drawer
