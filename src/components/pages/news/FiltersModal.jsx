import React, { useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import useModal from '../../../hooks/useModal'
import ButtonLink from '../../antd/ButtonLink'
import Modal from '../../antd/Modal'
import { NotificationError } from '../../antd/notifications'
import Space from '../../antd/Space'
import RegulationSelect from './RegulationSelect'
import SourcesSelect from './SourcesSelect'

const FiltersModal = () => {
  const { t } = useTranslation()

  const { visible, showModal, hideModal } = useModal()

  const { queryParams, loadInfiniteNewsFromStart } = useInfiniteNews()

  const [complianceAuthorities, setComplianceAuthorities] = useState(
    queryParams.sources
  )

  useEffect(() => {
    setComplianceAuthorities(queryParams.sources)
  }, [queryParams.sources])

  const [regulation, setRegulation] = useState(queryParams.regulation)

  useEffect(() => {
    setRegulation(queryParams.regulation)
  }, [queryParams.regulation])

  const onOk = useCallback(async () => {
    if (complianceAuthorities.length === 0) {
      NotificationError({ message: t('At least one source required.') })
    } else {
      loadInfiniteNewsFromStart({
        sources: complianceAuthorities,
        regulation
      })
      hideModal()
    }
  }, [complianceAuthorities,
    loadInfiniteNewsFromStart,
    regulation,
    hideModal,
    t])

  return (
    <>
      <ButtonLink onClick={showModal}>
        More filters
      </ButtonLink>
      <Modal
        title={t('More filters')}
        visible={visible}
        onCancel={hideModal}
        mask
        maskClosable
        onOk={onOk}
      >
        <Space direction='vertical' size={16}>
          <SourcesSelect
            bordered
            complianceAuthorities={complianceAuthorities}
            setComplianceAuthorities={setComplianceAuthorities}
          />
          <RegulationSelect
            bordered
            regulation={regulation}
            setRegulation={setRegulation}
          />
        </Space>
      </Modal>
    </>
  )
}

export default FiltersModal
