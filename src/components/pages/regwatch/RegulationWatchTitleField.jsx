import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { EditFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { replaceRegulationWatchName } from '../../../store/regulationWatch/effects'
import { useNetworkState, useRegulationWatchState } from '../../../utils/redux'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import Input from '../../antd/Input'
import { NotificationSuccess, NotificationError } from '../../antd/notifications'
import Spin from '../../antd/Spin'
import styles from './RegulationWatchTitleWidget.module.less'

const RegulationWatchTitleField = () => {
  const [form] = Form.useForm()

  const inputElement = useRef(null)

  const { activeRegulationWatch } = useRegulationWatchState()

  useEffect(() => {
    if (activeRegulationWatch && activeRegulationWatch.name) {
      form.setFieldsValue({ regulationWatchName: activeRegulationWatch.name })
    }
  }, [activeRegulationWatch, form])

  const { t } = useTranslation()

  const onFinish = useCallback(async ({ regulationWatchName }) => {
    try {
      if (!regulationWatchName) {
        throw new Error(t('A regulation watch name is required.'))
      }

      if (regulationWatchName !== activeRegulationWatch.name) {
        await replaceRegulationWatchName(
          activeRegulationWatch.regulationWatchId,
          { name: regulationWatchName }
        )
        NotificationSuccess({ message: t('Regulation watch renamed.') })
      }
    } catch (error) {
      NotificationError({ message: error.message })
    }
  }, [t, activeRegulationWatch])

  const onBlur = useCallback(() => {
    form.submit()
  }, [form])

  const { loading } = useNetworkState()

  const titleLabel = useMemo(() => t('Active regulation watch'), [t])

  return (
    <div style={{ width: '100%' }}>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='regulationWatchName'
          initialValue={activeRegulationWatch.name}
        >
          <Input
            size='large'
            className={styles.input}
            ref={inputElement}
            suffix={loading.REPLACE_REGULATION_WATCH_NAME
              ? <Spin/>
              : <Button border={false} type='gray'>
                <EditFilled/>
              </Button>}
            onBlur={onBlur}
          />
        </Form.Item>
      </Form>
      <i className={styles.smallText}>
        <small>{titleLabel}</small>
      </i>
    </div>
  )
}

export default RegulationWatchTitleField
