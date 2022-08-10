import React from 'react'

import classNames from 'classnames'

import styles from './WidgetBox.module.less'

/** ToDo:
 * Convert into Box component with all box options e.g.
 * padding, border, margin, background colour, size
*/

const WidgetBox = ({
  active = true,
  children,
  type = 'white',
  size = 'full',
  sizeH,
  padding = 'medium'
}) => (
  <div className={classNames(
    styles.widgetBox,
    styles[type],
    styles[size],
    { [styles[`${sizeH}H`]]: sizeH },
    { [styles[`padding-${padding}`]]: padding },
    { [styles.active]: active }
  )}>
    {children}
  </div>
)

export default WidgetBox
