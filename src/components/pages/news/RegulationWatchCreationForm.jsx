import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Flex from 'styled-flex-component'

import { createRegWatch, requestRegWatches } from '../../../store/regulationWatch/effects'
import { parseQuery } from '../../../utils/queryString'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import Modal from '../../antd/Modal'
import { NotificationSuccess, NotificationError } from '../../antd/notifications'

const RegulationWatchCreationForm = ({
  isVisible,
  closeModal,
  loading,
  initialValue = {}
}) => {
  const { t } = useTranslation()
  const history = useHistory()
  const {
    offset,
    size,
    ...queryWithoutPagination
  } = parseQuery(history.location.search)

  const [form] = Form.useForm()
  const onFinish = useCallback(async ({ name }) => {
    try {
      await createRegWatch({
        name,
        filter: queryWithoutPagination
      })
      await requestRegWatches()
      form.setFieldsValue({ name: null })
      closeModal()
      NotificationSuccess({ message: t('Search saved.') })
    } catch (error) {
      NotificationError({ message: t('Error saving search.') })
    }
  }, [
    t,
    form,
    closeModal,
    queryWithoutPagination
  ])

  const submitForm = useCallback(() => {
    form.submit()
  }, [form])

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Modal
        visible={isVisible}
        closable={false}
        okButtonProps={{ loading }}
        onOk={submitForm}
        onCancel={closeModal}
      >
        <Flex full alignStretch justifyBetween>
          <Form.Item
            name='name'
            label={t('Name saved search')}
            rules={[{ required: true, message: t('A name is required') }]}
            style={{ width: '100%' }}
            initialValue={initialValue.name}
          >
            <Input/>
          </Form.Item>
        </Flex>
      </Modal>
    </Form>
  )
}

export default RegulationWatchCreationForm
