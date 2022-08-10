import React, { useCallback, useState } from 'react'

import { FilterFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import Button from '../../antd/Button'
import Modal from '../../antd/Modal'
import Space from '../../antd/Space'
import NewsSearchBar from '../../global/NewsSearchBar'
import NewsDatePublishedRangeField from '../news/NewsDatePublishedRangeField'

const RegulationWatchFilters = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState()
  const openModal = useCallback(() => {
    setIsVisible(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsVisible(false)
  }, [])
  return (
    <>
      <Button
        type='gray'
        onClick={openModal}
      >
        <FilterFilled/>
      </Button>
      <Modal
        visible={isVisible}
        onOk={closeModal}
        okText={t('Back')}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <Space direction='vertical' size={16}>
          <NewsDatePublishedRangeField bordered/>
          <NewsSearchBar bordered/>
        </Space>
      </Modal>
    </>
  )
}

export default RegulationWatchFilters
