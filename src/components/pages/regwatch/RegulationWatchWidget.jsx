import React, { useCallback, useEffect, useRef } from 'react'

import Flex from 'styled-flex-component'

import SpinnerCentred from '../../animation/SpinnerCentred'
import WidgetBox from '../../layout/WidgetBox'
import TitleFlat from '../../typography/TitleFlat'
import styles from './RegulationWatchWidget.module.less'
import RegulationWatchWidgetContent from './RegulationWatchWidgetContent'

const RegulationWatchWidget = ({
  children,
  loading,
  title,
  sizeH = 'full',
  type,
  padding
}) => {
  const wrapperElement = useRef(null)
  const contentElement = useRef(null)
  const topShadowElement = useRef(null)
  const bottomShadowElement = useRef(null)

  const handleScroll = useCallback(() => {
    const contentScrollHeight = contentElement.current.scrollHeight -
      contentElement.current.offsetHeight
    const currentScroll = contentElement.current.scrollTop /
      contentScrollHeight
    const hasNoScrollArea = contentElement.current.scrollHeight ===
      wrapperElement.current.scrollHeight
    topShadowElement.current.style.opacity = hasNoScrollArea
      ? 0
      : currentScroll
    bottomShadowElement.current.style.opacity = hasNoScrollArea
      ? 0
      : 1 - currentScroll
  }, [])

  useEffect(() => {
    if (contentElement && contentElement.current) {
      const originalRef = contentElement.current
      originalRef.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      return () => {
        originalRef.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [contentElement, handleScroll])

  return (
    <WidgetBox
      padding={padding}
      sizeH={sizeH}
      type={type}
    >
      <Flex column style={{ gap: '8px', height: '100%' }}>
        <TitleFlat level={5}>
          {title}
        </TitleFlat>

        <div ref={wrapperElement} className={styles.wrapperContent}>
          <div ref={topShadowElement} className={styles.topShadow}/>
          <div ref={bottomShadowElement} className={styles.bottomShadow}/>
          <div ref={contentElement} className={styles.contentContainer}>
          {loading
            ? <SpinnerCentred/>
            : <RegulationWatchWidgetContent handleScroll={handleScroll}>
                {children}
              </RegulationWatchWidgetContent>
          }
          </div>
        </div>
      </Flex>
    </WidgetBox>
  )
}

export default RegulationWatchWidget
