import React, { useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import Modal from '../antd/Modal'
import AboutPhareText from '../slides/AboutPhareText'

const AboutUs = () => {
  const [visible, setVisible] = useState()
  const toggleVisibility = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const { t } = useTranslation()

  return (
    <>
      <span
        type='link'
        onClick={toggleVisibility}
      >
        {t('About us')}
      </span>
      <Modal
        title={t('About us')}
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
        mask
        maskClosable
      >
        <AboutPhareText/>
      </Modal>
    </>
  )
}

export default AboutUs
