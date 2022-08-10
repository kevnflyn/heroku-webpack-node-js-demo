import React from 'react'

import { useTranslation } from 'react-i18next'

import Typography from '../../antd/Typography'
import ResetNewsFeedButton from './ResetNewsFeedButton'
import styles from './ZeroResults.module.less'

const { Paragraph } = Typography

const ZeroResults = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.zeroResults}>
      <Paragraph><b>{t('0 results.')}</b></Paragraph>
      <Paragraph>
        {t('Try changing your filters to get more results.')}
        &nbsp;&nbsp;
        <ResetNewsFeedButton/>
      </Paragraph>
    </div>
  )
}

export default ZeroResults
