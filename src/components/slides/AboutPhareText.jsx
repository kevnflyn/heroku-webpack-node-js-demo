import React from 'react'

import { useTranslation } from 'react-i18next'

import { aboutPhareCompanyTextArray } from '../../copy/aboutCopy'
import Typography from '../antd/Typography'

const { Paragraph } = Typography

const AboutPhareText = () => {
  const { t } = useTranslation()
  return (
    <>
      {aboutPhareCompanyTextArray(t).map((text, index) => (
        <Paragraph key={index}>
          {text}
        </Paragraph>
      ))}
    </>
  )
}

export default AboutPhareText
