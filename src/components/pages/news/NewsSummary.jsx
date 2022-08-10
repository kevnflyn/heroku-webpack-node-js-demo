import React from 'react'

import Typography from '../../antd/Typography'
import SearchTextHighlighted from './SearchTextHighlighted'

const { Paragraph } = Typography

const NewsSummary = ({ summary }) => {
  return (
    <Paragraph
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: 'read more'
      }}
      style={{ marginBottom: '8px' }}
    >
      <SearchTextHighlighted text={summary}/>
    </Paragraph>
  )
}

export default NewsSummary
