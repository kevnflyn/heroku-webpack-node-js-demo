import React from 'react'

import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import CarouselLight from '../layout/CarouselLight'
import WidgetBox from '../layout/WidgetBox'
import Title from '../typography/Title'

const slideContainerStyle = {
  height: '100px'
}

const slideStyle = {
  maxWidth: '500px',
  flexDirection: 'column',
  textAlign: 'left'
}

const ProductLaunchWhySlideShow = () => {
  const { t } = useTranslation()
  return (
  <div>
    <WidgetBox type='transparent'>
      <CarouselLight
        autoPlay
        dotPosition='right'
        axis='vertical'
        showArrows={false}
        dynamicHeight={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
        interval={6000}
      >
        <Flex style={slideContainerStyle}>
          <Flex style={slideStyle}>
            <Title color='white' level={4}>
              {t('Financial institutions are spending 20% more on compliance each year')}
            </Title>
          </Flex>
        </Flex>
        <Flex style={slideContainerStyle}>
          <Flex style={slideStyle}>
            <Title color='white' level={4}>
              {t('Compliance officers spend, on average, 14% of their time monitoring regulatory changes')}
            </Title>
          </Flex>
        </Flex>
        <Flex style={slideContainerStyle}>
          <Flex style={slideStyle}>
            <Title color='white' level={4}>
              {t('13% of all financial staff working with implementing new regulations')}
            </Title>
          </Flex>
        </Flex>
      </CarouselLight>
    </WidgetBox>
  </div>
  )
}

export default ProductLaunchWhySlideShow
