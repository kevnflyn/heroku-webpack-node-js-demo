import React, { useCallback, useEffect, useMemo, useState } from 'react'

import moment from 'moment'
import { useTranslation } from 'react-i18next'
import Flex from 'styled-flex-component'

import { replaceRegulationWatchDailyAlertTimes } from '../../../store/regulationWatch/effects'
import { useNetworkState } from '../../../utils/redux'
import Button from '../../antd/Button'
import Form from '../../antd/Form'
import { NotificationError, NotificationSuccess } from '../../antd/notifications'
import Tag from '../../antd/Tag'
import TimePicker from '../../antd/TimePicker'

const { CheckableTag } = Tag

const daysOfTheWeek = t => [
  {
    label: t('Mon'),
    name: 'alertTimeMonday'
  },
  {
    label: t('Tue'),
    name: 'alertTimeTuesday'
  },
  {
    label: t('Wed'),
    name: 'alertTimeWednesday'
  },
  {
    label: t('Thu'),
    name: 'alertTimeThursday'
  },
  {
    label: t('Fri'),
    name: 'alertTimeFriday'
  },
  {
    label: t('Sat'),
    name: 'alertTimeSaturday'
  },
  {
    label: t('Sun'),
    name: 'alertTimeSunday'
  }
]

const format = 'HH:mm'

const createMomentTime = timeString => timeString
  ? moment(timeString, format)
  : null

const getEnabledDaysStateFromAlertTimes = dailyAlertTimes => ({
  alertTimeMonday: !!dailyAlertTimes.alertTimeMonday,
  alertTimeTuesday: !!dailyAlertTimes.alertTimeTuesday,
  alertTimeWednesday: !!dailyAlertTimes.alertTimeWednesday,
  alertTimeThursday: !!dailyAlertTimes.alertTimeThursday,
  alertTimeFriday: !!dailyAlertTimes.alertTimeFriday,
  alertTimeSaturday: !!dailyAlertTimes.alertTimeSaturday,
  alertTimeSunday: !!dailyAlertTimes.alertTimeSunday
})

const RegulationWatchAlertTimes = ({
  dailyAlertTimes,
  hasAlertsEnabled,
  regulationWatchId
}) => {
  const { loading } = useNetworkState()
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onFinish = useCallback(async formFields => {
    try {
      const payload = Object
        .keys(formFields)
        .reduce((times, key) => formFields[key]
          ? {
              ...times,
              [key]: moment(formFields[key]).format(`${format}Z`)
            }
          : {
              ...times,
              [key]: null
            }
        , {})

      await replaceRegulationWatchDailyAlertTimes(regulationWatchId, payload)

      NotificationSuccess({ message: t('Daily alert times updated.') })
    } catch (error) {
      NotificationError({
        message: t('Updating alert times'),
        description: error.message
      })
    }
  }, [t, regulationWatchId])

  const options = useMemo(() => daysOfTheWeek(t), [t])

  const [
    enabledDays,
    setEnabledDays
  ] = useState(getEnabledDaysStateFromAlertTimes(dailyAlertTimes))

  const onEnableDay = useCallback((newState, name) => {
    setEnabledDays({
      ...enabledDays,
      [name]: newState
    })
    if (!newState) {
      form.setFieldsValue({ [name]: null })
    }
  }, [enabledDays, form])

  useEffect(() => {
    if (dailyAlertTimes) {
      setEnabledDays(getEnabledDaysStateFromAlertTimes(dailyAlertTimes))

      form.setFieldsValue(Object
        .keys(dailyAlertTimes)
        .reduce((times, key) => {
          const time = dailyAlertTimes[key]
          return typeof time === 'string'
            ? {
                ...times,
                [key]: createMomentTime(time)
              }
            : {
                ...times,
                [key]: null
              }
        }, {}))
    }
  }, [
    dailyAlertTimes,
    form
  ])

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Flex alignEnd justifyBetween>
        <Flex column>
          {options.map(({ label, name }) => (
            <Flex key={name} alignCenter justifyBetween>
              {hasAlertsEnabled
                ? (
                  <CheckableTag
                    onChange={state => { onEnableDay(state, name) }}
                    checked={enabledDays[name]}
                    style={{ width: '40px' }}
                  >
                    {label}
                  </CheckableTag>
                  )
                : (
                    <Tag style={{
                      background: 'transparent',
                      border: '1px solid transparent'
                    }}>{label}</Tag>
                  )}
              <Form.Item
                name={name}
                initialValue={createMomentTime(dailyAlertTimes[name])}
                style={{ marginBottom: 0 }}
              >
                <TimePicker
                  size='small'
                  disabled={!enabledDays[name] || !hasAlertsEnabled}
                  format={format}
                  showNow={false}
                  placeholder={t('Select time')}
                />
              </Form.Item>
            </Flex>
          ))}
        </Flex>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='small'
            loading={loading.REPLACE_REGULATION_WATCH_DAILY_ALERT}
          >
            {t('Update')}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  )
}

export default RegulationWatchAlertTimes
