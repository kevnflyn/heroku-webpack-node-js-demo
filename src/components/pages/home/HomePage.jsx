import React from 'react'

import ApplicationWrapperPublic from '../../global/ApplicationWrapperPublic'
import SlideAboutPhare from '../../slides/SlideAboutPhare'
import SlideLandingWithSignup from '../../slides/SlideLandingWithSignup'
import SlideProductFeatures from '../../slides/SlideProductFeatures'

const HomePage = () => {
  return (
    <ApplicationWrapperPublic>
      <SlideLandingWithSignup/>
      <SlideAboutPhare/>
      <SlideProductFeatures/>
    </ApplicationWrapperPublic>
  )
}

export default HomePage
