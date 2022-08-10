import React, { useCallback } from 'react'

import { CloseCircleOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'

import { deleteNewsFilter } from '../../../store/news/effects'
import Button from '../../antd/Button'

const NewsFilterDelete = ({ id }) => {
  const history = useHistory()
  const location = useLocation()
  const onClick = useCallback(
    () => deleteNewsFilter(id, history, location.search),
    [id, history, location]
  )
  return (
    <Button type='link'>
      <CloseCircleOutlined
        onClick={onClick}
        style={{ fontSize: '18px' }}/>
    </Button>
  )
}

export default NewsFilterDelete
