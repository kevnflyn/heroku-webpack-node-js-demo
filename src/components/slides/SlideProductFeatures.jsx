import React from 'react'

import {
  ControlOutlined,
  TranslationOutlined,
  FileDoneOutlined,
  AlertOutlined,
  FieldBinaryOutlined,
  BankOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import Typography from '../antd/Typography'
import ColDefault from '../layout/ColDefault'
import ColumnAlone from '../layout/ColumnAlone'
import GridTitle from '../layout/GridTitle'
import RowStandard from '../layout/RowStandard'
import SectionFull from '../layout/SectionFull'
import Title from '../typography/Title'

const colProps = {
  xs: { span: 24, offset: 0 },
  sm: { span: 18, offset: 3 },
  md: { span: 10, offset: 1 },
  lg: { span: 8, offset: 0 }
}

const { Paragraph } = Typography

const SlideProductFeatures = () => {
  const { t } = useTranslation()
  return (
  <SectionFull color='gray' size='partial' column>
    <RowStandard>
      <ColumnAlone>
        <GridTitle
          title={t('Effortless Monitoring')}
          subtitle={t('Our service allows you to spend time on solving regulatory issues, not merely finding them')}
        />
      </ColumnAlone>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <FieldBinaryOutlined/>
          </Title>
          <Title level={4}>
            {t('One Source of Truth')}
          </Title>
        </Flex>
        <Paragraph>
          {t('We pool data from all the relevant sources into one database, giving you access to one golden source for all your regulatory monitoring needs.')}
        </Paragraph>
      </ColDefault>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <ControlOutlined/>
          </Title>
          <Title level={4}>
            {t('Customised news feeds')}
          </Title>
        </Flex>
        <Paragraph>
          {t('Adapt your news feed to your specific needs which will ensure you receive the information that is most relevant to you.')}
        </Paragraph>
      </ColDefault>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <FileDoneOutlined/>
          </Title>
          <Title level={4}>
            {t('Summaries and keywords')}
          </Title>
        </Flex>
        <Paragraph>
          {t('With our technology we create accurate summaries and together with AI-backed keywords you can quickly assess new updates and their relevance to your business')}
        </Paragraph>
      </ColDefault>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <TranslationOutlined/>
          </Title>
          <Title level={4}>
            {t('Translations of choice')}
          </Title>
        </Flex>
        <Paragraph>
          {t('We translated your news feeds to your language of choice, breaking down any language barriers that may exist.')}
        </Paragraph>
      </ColDefault>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <AlertOutlined/>
          </Title>
          <Title level={4}>
            {t('Email Alerts')}
          </Title>
        </Flex>
        <Paragraph>
          {t('Receive email alerts to make sure you are always updated on new changes. Customise your alerts according to your preferences.')}
        </Paragraph>
      </ColDefault>

      <ColDefault {...colProps}>
        <Flex column>
          <Title color='achromatopsia' level={2} alignCenter>
            <BankOutlined/>
          </Title>
          <Title level={4}>
            {t('In-house commentaries')}
          </Title>
        </Flex>
        <Paragraph>
          {t('Supporting you with weekly roundups and commentaries that summarise the most important regulatory changes in your industry')}
        </Paragraph>
      </ColDefault>
    </RowStandard>
  </SectionFull>
  )
}

export default SlideProductFeatures
