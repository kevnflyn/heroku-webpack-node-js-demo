import React from 'react'

import { useTranslation } from 'react-i18next'

import { useUserState } from '../../utils/redux'
import ColumnAlone from '../layout/ColumnAlone'
import GridTitle from '../layout/GridTitle'
import RowStandard from '../layout/RowStandard'
import SectionFull from '../layout/SectionFull'
import SimpleSubscribeFormConfirmed from './SimpleSubscribeFormConfirmed'

const SlideSubscribe = () => {
  const { hasSubscribed } = useUserState()
  const { t } = useTranslation()
  return (
    <SectionFull size='fit' column>
      <RowStandard>
        <ColumnAlone>
          <GridTitle
            title={hasSubscribed ? t('Welcome to the club!') : t('Join our waiting list')}
            subtitle={t('Be the first to get access when our beta version is ready.')}
            color='white'
          />
        </ColumnAlone>
        <ColumnAlone>
          <SimpleSubscribeFormConfirmed disabled={hasSubscribed}/>
        </ColumnAlone>
      </RowStandard>
    </SectionFull>
  )
}

export default SlideSubscribe
