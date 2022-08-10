import React from 'react'

import { ArrowRightOutlined } from '@ant-design/icons'

import { useLocationFacade } from '../../../hooks/useLocationFacade'
import { openNewsDrawer } from '../../../store/newsUi/effects'
import { getRegexForFindingKeywords } from '../../../utils/text'
import ButtonLink from '../../antd/ButtonLink'
import Space from '../../antd/Space'
import Conditional from '../../layout/Conditional'

const CorpusKeywordsFound = ({ newsItem }) => {
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

  const condition = () => {
    const regex = getRegexForFindingKeywords(keywords)
    return keywords.length > 0 && regex.test(newsItem.corpusOrig)
  }

  const onClick = () => {
    openNewsDrawer(newsItem)
  }

  return (
    <Conditional condition={condition}>
      <ButtonLink onClick={onClick}>
        <Space size={4}>
          Keywords found in corpus
          <ArrowRightOutlined/>
        </Space>
      </ButtonLink>
    </Conditional>
  )
}

export default CorpusKeywordsFound
