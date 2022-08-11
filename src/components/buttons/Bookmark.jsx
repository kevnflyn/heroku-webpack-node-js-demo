import React, { useCallback, useState } from 'react'

import Icon from '@ant-design/icons'

import SvgBookmark from '../../../assets/images/bookmark.svg'
import Button from '../antd/Button'
import Typography from '../antd/Typography'

const { Text } = Typography

/**
 * ToDo: Decide what to do with this component!
 * */

const Bookmark = ({ defaultToggled = false }) => {
  const [active, setActive] = useState(defaultToggled)
  const toggleActive = useCallback(
    () => {
      setActive(!active)
      alert('Ah ah ah! This feature doesn\'t work yet')
    },
    [active]
  )

  const icon = <Icon style={{ fontSize: '1.5em' }} component={SvgBookmark}/>

  if (active) {
    return (
      <Button type='link' onClick={toggleActive}>
        {icon}
      </Button>
    )
  }

  return (
    <Button type='link' onClick={toggleActive}>
      <Text type='secondary'>
        {icon}
      </Text>
    </Button>
  )
}

export default Bookmark
