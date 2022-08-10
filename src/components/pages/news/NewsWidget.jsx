import React from 'react'

import WidgetBox from '../../layout/WidgetBox'

const NewsWidget = ({
  active,
  children
}) => (
  <WidgetBox active={active}>
    {children}
  </WidgetBox>
)

export default NewsWidget
