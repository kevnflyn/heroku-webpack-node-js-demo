import React from 'react'

import ProductLaunchWrapper from '../../global/ProductLaunchWrapper'
import SlideProductFeatures from '../../slides/SlideProductFeatures'
import SlideProductLaunch from '../../slides/SlideProductLaunch'
import SlideSubscribe from '../../slides/SlideSubscribe'

const ProductLaunchPage = () => {
  return (
    <ProductLaunchWrapper>
      <SlideProductLaunch/>
      <SlideProductFeatures/>
      <SlideSubscribe/>
    </ProductLaunchWrapper>
  )
}

export default ProductLaunchPage
