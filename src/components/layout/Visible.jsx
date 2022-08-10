import React from 'react'

import styles from './Visible.module.less'

const Visible = ({ children, display = [], hide = [] }) => {
  const visibleClasses = display
    .map(bp => styles[`visible-${bp}`])
    .filter(bp => !!bp)
    .join(' ')

  const hiddenClasses = hide
    .map(bp => styles[`hidden-${bp}`])
    .filter(bp => !!bp)
    .join(' ')

  return (
    <div className={[visibleClasses, hiddenClasses].join(' ')}>
      {children}
    </div>
  )
}

export default Visible
