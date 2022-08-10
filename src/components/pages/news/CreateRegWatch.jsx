import { SaveOutlined } from '@ant-design/icons'
import React, { useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useNetworkState } from '../../../utils/redux'
import Button from '../../antd/Button'
import styles from './CreateRegWatch.module.less'
import RegulationWatchCreationForm from './RegulationWatchCreationForm'

const CreateRegWatch = () => {
  const { t } = useTranslation()
  const { loading } = useNetworkState()

  const [isVisible, setIsVisible] = useState()
  const openModal = useCallback(async () => {
    setIsVisible(true)
  }, [])
  const closeModal = useCallback(async () => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <Button
        block
        size='small'
        onClick={openModal}
        className={styles.createRegWatchButton}
        type='default'
        loading={loading.CREATE_REGULATION_WATCH ||
          loading.REGULATION_WATCHES}
      >
        <SaveOutlined/>
        {t('Save')}
      </Button>
      <RegulationWatchCreationForm
        closeModal={closeModal}
        isVisible={isVisible}
        loading={loading.CREATE_REGULATION_WATCH ||
          loading.REGULATION_WATCHES}
      />
    </>
  )
}

export default CreateRegWatch
