
import React from 'react'

import { Trans, useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { routes } from '../../routes'
import BrandIconWhite from '../imagery/BrandIconWhite'
import ColumnInTwos from '../layout/ColumnInTwos'
import RowDefault from '../layout/RowDefault'
import SectionFull from '../layout/SectionFull'
import Visible from '../layout/Visible'
import LinkWhite from '../navigation/LinkWhite'
import SignUpOpposite from '../navigation/SignUpOpposite'
import Title from '../typography/Title'

const SlideLandingWithSignup = () => {
  const { t } = useTranslation()
  const appIndustryText = t('Reinventing compliance with AI')
  const AppDescriptionText = () => (
    <div>
      <Trans>
        <LinkWhite to={routes.register}>Sign up</LinkWhite> to
        get early access to our beta regulatory watch platform
        tailored for the financial services sector in Luxembourg.
      </Trans>
    </div>
  )
  return (
    <SectionFull
      bgImg='../assets/images/pexels-jess-vide-6389380.jpg'
      color='transparent'
      seeThroughLayer='brand'
      size='full'
    >
      <Flex alignCenter style={{ height: '100%' }}>
        <RowDefault gutter='very-large'>
          <ColumnInTwos lg={{ span: 12, offset: 0 }}>
            <Flex alignCenter style={{ height: '100%' }}>
              <Visible hide={['md']}>
                <Flex column style={{ paddingLeft: '5px' }}>
                  <BrandIconWhite size='96px'/>
                </Flex>
              </Visible>
              <Visible hide={['xs']} display={['md']}>
                <Flex column style={{ paddingLeft: '5px' }}>
                  <BrandIconWhite size='320px'/>
                </Flex>
              </Visible>
            </Flex>
          </ColumnInTwos>
          <ColumnInTwos>
            <Visible hide={['lg']}>
              <Flex column>
                <Title color='white' level={1}>
                  {appIndustryText}
                  <br/>
                </Title>
                <Title color='white' level={4}>
                  <AppDescriptionText/>
                </Title>
              </Flex>
            </Visible>
            <Visible hide={['xs']} display={['lg']}>
              <Flex column>
                <Title color='white' level={0}>
                  {appIndustryText}
                  <br/>
                </Title>
                <Title color='white' level={4}>
                  <AppDescriptionText/>
                </Title>
              </Flex>
            </Visible>
            <SignUpOpposite/>
          </ColumnInTwos>
        </RowDefault>
      </Flex>
    </SectionFull>
  )
}

export default SlideLandingWithSignup
