import React from 'react'

import { useTranslation } from 'react-i18next'

import { aboutPhareCompanyTextArray } from '../../copy/aboutCopy'
import Typography from '../antd/Typography'
import ColumnAlone from '../layout/ColumnAlone'
import Dot from '../layout/Dot'
import GridTitle from '../layout/GridTitle'
import RowStandard from '../layout/RowStandard'
import SectionFull from '../layout/SectionFull'
import Text from '../typography/Text'

const { Paragraph } = Typography

const SlideAboutPhare = () => {
  const { t } = useTranslation()
  const aboutText = aboutPhareCompanyTextArray(t)
  return (
    <SectionFull size='fill' column>
      <RowStandard>
        <ColumnAlone>
          <GridTitle
            title={t('Phare who?')}
            color='white'
          />
        </ColumnAlone>
        {aboutText.map((text, index) => (
          <ColumnAlone key={index}>
            <Paragraph>
              <Text color='white'>
                {text}
              </Text>
              <br/>
              <br/>
              {index !== aboutText.length - 1 && (
                <Text color='white'>
                  <div style={{ textAlign: 'center' }}>
                    <Dot/>
                  </div>
                </Text>
              )}
            </Paragraph>
          </ColumnAlone>
        ))}
      </RowStandard>
    </SectionFull>
  )
}

export default SlideAboutPhare
