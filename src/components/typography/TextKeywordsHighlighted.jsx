import React from 'react'

import { getRegexForFindingKeywords } from '../../utils/text'
import styles from './TextKeywordsHighlighted.module.less'

const TextKeywordsHighlighted = ({
  text,
  keywords = []
}) => {
  if (keywords.length) {
    const regex = getRegexForFindingKeywords(keywords)

    const parts = text.split(regex)

    return <span>
      {parts.filter(part => part).map((part, i) => (
        <span key={i} className={
          regex.test(part) ? styles.textKeywordsHighlighted : ''
        }>{part}</span>
      ))}
    </span>
  }

  return <span>{text}</span>
}

export default TextKeywordsHighlighted
