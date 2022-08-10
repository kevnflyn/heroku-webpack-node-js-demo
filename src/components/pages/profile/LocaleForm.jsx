import React from 'react'

import langs from '../../../maps/langs'
import Form from '../../antd/Form'
import Select from '../../antd/Select'
import ProfileSetting from './ProfileSetting'

const langOptions = Object
  .values(langs)
  .map(({
    nativeName,
    key
  }) => ({
    value: key,
    label: nativeName
  }))

const LocaleForm = ({ onFinish, form, locale }) => {
  return (
    <ProfileSetting
      direction='vertical'
      form={form}
      onFinish={onFinish}
      initialValues={locale}
    >
      <Form.Item name='lang' style={{ width: '100%' }}>
        <Select
          showArrow
          options={langOptions}
        />
      </Form.Item>
    </ProfileSetting>
  )
}

export default LocaleForm
