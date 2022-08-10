import { useState, useCallback } from 'react'

const useModal = (initialVisible) => {
  const [visible, setVisible] = useState(initialVisible)
  const showModal = useCallback(() => {
    setVisible(true)
  }, [])
  const hideModal = useCallback(() => {
    setVisible(false)
  }, [])
  return {
    visible,
    showModal,
    hideModal
  }
}

export default useModal
