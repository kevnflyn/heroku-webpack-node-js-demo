import React, { useMemo } from 'react'

import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import complianceSources from '../../../maps/complianceSources'
import { closeNewsDrawer } from '../../../store/newsUi/effects'
import { useNewsUiState } from '../../../utils/redux'
import ButtonLink from '../../antd/ButtonLink'
import Drawer from '../../antd/Drawer'
import Space from '../../antd/Space'
import Typography from '../../antd/Typography'
import DownloadPdf from '../../buttons/DownloadPdf'
import NewsTags from './NewsTags'
import NewsTitle from './NewsTitle'
import SearchTextHighlighted from './SearchTextHighlighted'

const { Paragraph, Title, Text } = Typography

const NewsDrawer = ({ col }) => {
  const { newsDrawer: { newsItem } } = useNewsUiState()
  const isVisible = !!newsItem

  const {
    header,
    corpusOrig,
    country,
    link,
    published,
    summary,
    source,
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
    pdfLink
  } = newsItem || {}

  const tags = useMemo(() => ([
    tag1,
    tag2,
    tag3,
    tag4,
    tag5
  ]).filter(tag => typeof tag === 'string'), [
    tag1,
    tag2,
    tag3,
    tag4,
    tag5
  ])

  const datePublished = useMemo(() => (
    new Date(published).toLocaleDateString(
      undefined,
      { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    )
  ), [published])

  const { t } = useTranslation()

  const sources = complianceSources(t)

  if (!newsItem) {
    return newsItem
  }

  return (
    <Drawer
      title={(
        <ButtonLink
          target='_blank'
          rel='noreferrer'
          href={link}
        >
          <NewsTitle>
            {header}
          </NewsTitle>
        </ButtonLink>
      )}
      onClose={closeNewsDrawer}
      visible={isVisible}
      mask={false}
      height='80%'
      responsiveColWidth={col}
    >
      <Space size={32} direction='vertical'>
        <Space size={8} direction='vertical'>
          <Title level={5}>
            {t('Summary')}
          </Title>

          <Space size={8} wrap>
            <span>{sources[source].label}</span>
            <span>&middot;</span>
            <span>{country}</span>
            <span>&middot;</span>
            <span>{`
              ${(datePublished)}
            `}</span>
            {pdfLink && pdfLink !== 'NULL' &&
            <>
              <span>&middot;</span>
              <DownloadPdf link={pdfLink}/>
            </>}
          </Space>

          <Text>
            {(summary && <SearchTextHighlighted text={summary}/>)}
          </Text>
        </Space>

        {!!tags.length && (
          <Space size={[8, 16]} wrap>
            <Title level={5}>
              {t('Keywords')}
            </Title>
            {!!tags.length && <NewsTags tags={tags}/>}
          </Space>
        )}

        <Space size={8} direction='vertical'>
          <Flex style={{ width: '100%' }} justifyBetween alignCenter wrap>
            <Title level={5}>
              {t('Original Text')}
            </Title>
            <ButtonLink
              target='_blank'
              rel='noreferrer'
              href={link}
            >
              {t('View source')}
            </ButtonLink>
          </Flex>
          <Paragraph>
            {corpusOrig && <SearchTextHighlighted text={corpusOrig}/>}
          </Paragraph>
        </Space>
      </Space>
    </Drawer>
  )
}

export default NewsDrawer
