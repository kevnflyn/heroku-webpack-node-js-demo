import React from 'react'

import { useTranslation } from 'react-i18next'

import Button from '../../antd/Button'
import FormWrapper from '../../form/FormWrapper'
import ColDefault from '../../layout/ColDefault'
import RowDefault from '../../layout/RowDefault'
import Title from '../../typography/Title'
import style from './ProfileSetting.module.less'

const ProfileSetting = ({
  title,
  children,
  form,
  onFinish,
  direction = 'horizontal',
  initialValues
}) => {
  const { t } = useTranslation()

  const validateThenSubmit = async event => {
    try {
      event.preventDefault()
      await form.validateFields()
      const values = form.getFieldsValue(true)
      onFinish(values)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <FormWrapper
      className={style.profileSetting}
      form={form}
      initialValues={initialValues}
    >
      {title && <Title level={5} lightweight>{title}</Title>}

      <RowDefault gutter='small'>
        <ColDefault {...{
          xs: { span: direction === 'horizontal' ? 22 : 24, offset: 0 }
        }}>
          <div className={style.settings}>
            {children}
          </div>
        </ColDefault>
        <ColDefault {...{
          xs: { span: direction === 'horizontal' ? 2 : 24, offset: 0 }
        }}>
          <Button onClick={validateThenSubmit} block type='secondary' htmlType='submit'>{t('Update')}</Button>
        </ColDefault>
      </RowDefault>
    </FormWrapper>
  )
}

export default ProfileSetting
