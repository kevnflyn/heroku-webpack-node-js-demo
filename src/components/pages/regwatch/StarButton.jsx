import React, { useCallback } from 'react'

import styles from './StarButton.module.less'

const StarButton = ({ active, onClick }) => {
  const onClickHandler = useCallback(() => {
    onClick(!active)
  }, [active, onClick])

  return (
    <div
      className={active ? styles.starButtonActive : styles.starButton}
      onClick={onClickHandler}
    >
      <span/>
    </div>
  )
}

export default StarButton
