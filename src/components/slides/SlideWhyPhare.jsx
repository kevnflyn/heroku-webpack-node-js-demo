import React from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import ColDefault from '../layout/ColDefault'
import ColumnInTwos from '../layout/ColumnInTwos'
import GridTitle from '../layout/GridTitle'
import RowDefault from '../layout/RowDefault'
import SectionFull from '../layout/SectionFull'
import ProductLaunchWhySlideShow from './ProductLaunchWhySlideShow'

const SlideWhyPhare = () => {
  const { t } = useTranslation()
  return (
  <SectionFull
    color='brand'
    size='fit'
  >
    <RowDefault>
      <ColDefault
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 18, offset: 3 }}
        md={{ span: 14, offset: 5 }}
        lg={{ span: 24, offset: 0 }}
      >
        <Flex alignCenter style={{ height: '100%' }}>
          <RowDefault gutter='large'>
            <ColumnInTwos lg={{ span: 12, offset: 0 }}>
              <GridTitle
                title={t('Why Phare?')}
                subtitle={t('Phare is addressing the increasing regulatory pressure experienced by financial services professionals today')}
                position='left'
                color='white'
              />
            </ColumnInTwos>
            <ColumnInTwos lg={{ span: 12, offset: 0 }}>
              <ProductLaunchWhySlideShow/>
            </ColumnInTwos>
          </RowDefault>
        </Flex>
      </ColDefault>
    </RowDefault>
  </SectionFull>
  )
}

export default SlideWhyPhare
