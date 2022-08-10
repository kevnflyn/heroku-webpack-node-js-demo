import React from 'react'

// ToDo: finish component

// import classnames from 'classnames'

// import styles from './SpaceOutside.module.less'

const DIRECTION = {
  all: 'all',
  vertical: 'vertical',
  horizontal: 'horizontal'
}

const SIZE = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
}

const SpaceOutside = ({
  children,
  size = SIZE.medium,
  direction = DIRECTION.all
}) => (
  <div className={}>
    {children}
  </div>
)

export default SpaceOutside
