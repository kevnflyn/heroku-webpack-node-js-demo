import React, { useCallback } from 'react'

import { EyeOutlined } from '@ant-design/icons'

import { markComplianceArticleAsRead } from '../../../store/news/effects'
import Button from '../../antd/Button'

const ButtonMarkRead = ({ hasReadArticle, articleId }) => {
  const onClick = useCallback(() => {
    markComplianceArticleAsRead(articleId)
  }, [articleId])

  if (hasReadArticle) {
    return null
  }

  return <Button
    size='small'
    onClick={onClick}
    type='ghost'
    icon={<EyeOutlined/>}
  >
    Mark as read
  </Button>
}

export default ButtonMarkRead
