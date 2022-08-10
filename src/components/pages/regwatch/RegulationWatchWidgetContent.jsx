import React, { useEffect } from 'react'

const RegulationWatchWidgetContent = ({ handleScroll, children }) => {
  useEffect(() => {
    setTimeout(handleScroll, 1400)
  }, [handleScroll])
  return <div>{children}</div>
}

export default RegulationWatchWidgetContent
