
import React, { useEffect, useRef } from 'react'

import Flex from 'styled-flex-component'

import { useNewsState } from '../../../utils/redux'
import List from '../../antd/List'
import Space from '../../antd/Space'
import Typography from '../../antd/Typography'
import DownloadPdf from '../../buttons/DownloadPdf'
import SourceAvatar from '../../imagery/SourceAvatar'
import ColDefault from '../../layout/ColDefault'
import RowDefault from '../../layout/RowDefault'
import ButtonMarkRead from './ButtonMarkRead'
import CorpusKeywordsFound from './CorpusKeywordsFound'
import styles from './NewsItem.module.less'
import NewsItemMeta from './NewsItemMeta'
import NewsSummary from './NewsSummary'
import NewsTags from './NewsTags'
import NewsTitleLink from './NewsTitleLink'
import PinNewsCheckbox from './PinNewsCheckbox'

const { Paragraph } = Typography

const NewsItem = ({ news }) => {
  const {
    pdfLink,
    source,
    summary,
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    id,
    read
  } = news

  const tags = [
    tag1,
    tag2,
    tag3,
    tag4,
    tag5
  ].filter(tag => typeof tag === 'string')

  const ref = useRef()

  const { scrollToNewsItemTarget } = useNewsState()

  useEffect(() => {
    if (id === scrollToNewsItemTarget) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <List.Item
      className={`
        ${styles.listItem}
        ${id === scrollToNewsItemTarget && styles.highlighted}
        ${read && styles.newsItemRead}`}
    >
      <List.Item.Meta
        avatar={(
          <Space direction='vertical' size='4px'>
            <SourceAvatar source={source}/>
            <br/>
          </Space>
        )}
      />
      <div className={styles.listItemContent}>
        <RowDefault>
          <ColDefault style={{ padding: 0 }} span={24}>
            <Flex ref={ref} column style={{ gap: '8px' }}>
              <Flex full justifyBetween style={{ gap: '16px' }}>
                <Flex column>
                  <NewsItemMeta item={news}/>
                  <NewsTitleLink news={news}/>
                </Flex>

                <Flex justifyEnd style={{ paddingRight: '12px' }}>
                  <PinNewsCheckbox articleId={news.id}/>
                </Flex>
              </Flex>

              {summary && <NewsSummary summary={summary}/>}

              <CorpusKeywordsFound newsItem={news}/>

              {tags.length !== 0 && (
                <Paragraph>
                  <br/>
                  <NewsTags tags={tags}/>
                </Paragraph>
              )}

              <Space size={8}>
                {pdfLink && pdfLink !== 'NULL' && (
                  <DownloadPdf link={pdfLink}/>
                )}

                <ButtonMarkRead hasReadArticle={news.read} articleId={news.id}/>
              </Space>
            </Flex>
          </ColDefault>
        </RowDefault>
      </div>
    </List.Item>
  )
}

export default NewsItem
