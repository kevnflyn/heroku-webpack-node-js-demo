import React from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { useUserState } from '../../utils/redux'
import Space from '../antd/Space'
import BrandIconWhite from '../imagery/BrandIconWhite'
import ColumnInTwos from '../layout/ColumnInTwos'
import RowStandard from '../layout/RowStandard'
import SectionFull from '../layout/SectionFull'
import Visible from '../layout/Visible'
import Title from '../typography/Title'
import SimpleSubscribeForm from './SimpleSubscribeForm'

const ProductLaunchText = () => {
  const { hasSubscribed } = useUserState()
  const { t } = useTranslation()
  return (
    <>
      <Visible hide={['md']}>
        <Title color='white' level={1}>
          {t('Stay on top of your compliance')}
        </Title>
      </Visible>
      <Visible hide={['xs']} display={['md']}>
        <Title color='white' level={0}>
          {t('Stay on top of your compliance')}
        </Title>
      </Visible>
      <Space direction='vertical' size={16}>
        <Title lightweight color='white' level={4}>
          {t('Phare is addressing the increasing regulatory pressure experienced by financial services professionals today.')}
        </Title>
        <Title lightweight color='white' level={4}>
          {t('We are soon launching our first regulatory monitoring tool for financial professionals in Luxembourg.')}
        </Title>
        {!hasSubscribed && (
          <>
            <Title lightweight color='white' level={4}>
              {t('Join our waiting list now!')}
            </Title>
            <SimpleSubscribeForm column callToAction='Subscribe'/>
          </>
        )}
      </Space>
    </>
  )
}

const SlideProductLaunch = () => (
  <SectionFull
    bgImg='../assets/images/pexels-jess-vide-6389380.jpg'
    color='transparent'
    seeThroughLayer='brand'
    size='full'
  >
    <Flex alignCenter style={{ height: '100%' }}>
      <RowStandard>
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

        <ColumnInTwos lg={{ span: 12, offset: 0 }}>
          <Visible hide={['lg']}>
            <div style={{ textAlign: 'left' }}>
              <ProductLaunchText/>
            </div>
          </Visible>
          <Visible hide={['xs']} display={['lg']}>
            <div style={{ textAlign: 'right' }}>
              <ProductLaunchText/>
            </div>
          </Visible>
        </ColumnInTwos>
      </RowStandard>
    </Flex>
  </SectionFull>
)

export default SlideProductLaunch
