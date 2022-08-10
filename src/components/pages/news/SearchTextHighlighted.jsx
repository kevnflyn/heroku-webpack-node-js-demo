import React from 'react'

import { useLocationFacade } from '../../../hooks/useLocationFacade'
import TextKeywordsHighlighted from '../../typography/TextKeywordsHighlighted'

const SearchTextHighlighted = ({ text }) => {
  const {
    searchAsObject: {
      search = '',
      regulation = []
    }
  } = useLocationFacade()

  const keywords = [
    ...search.split(' '),
    ...regulation
  ].filter(truthyValue => truthyValue)

  return <TextKeywordsHighlighted keywords={keywords} text={text}/>
}

export default SearchTextHighlighted
