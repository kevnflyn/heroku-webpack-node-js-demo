import React, { useState, useCallback } from 'react'

import Menu from '../antd/Menu'

const MenuItem = ({ render, ...props }) => {
  const [inFocus, setInFocus] = useState(false)

  const setHasFocused = useCallback(() => {
    setInFocus(true)
  }, [])

  const setHasLostFocus = useCallback(() => {
    setInFocus(false)
  }, [])

  const onMouseEnter = useCallback(event => {
    setHasFocused()
    if (props.onMouseEnter) {
      props.onMouseEnter(event)
    }
  }, [setHasFocused, props])

  const onMouseLeave = useCallback(event => {
    setHasLostFocus()
    if (props.onMouseLeave) {
      props.onMouseLeave(event)
    }
  }, [setHasLostFocus, props])

  const onFocus = useCallback(event => {
    setHasFocused()
    if (props.onFocus) {
      props.onFocus(event)
    }
  }, [setHasFocused, props])

  const onBlur = useCallback(event => {
    setHasLostFocus()
    if (props.onBlur) {
      props.onBlur(event)
    }
  }, [setHasLostFocus, props])

  return (
    <Menu.Item
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {render({ inFocus })}
    </Menu.Item>
  )
}

export default MenuItem
