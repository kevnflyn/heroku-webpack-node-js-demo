import React from 'react'

import Title from '../typography/Title'
import ColumnAlone from './ColumnAlone'
import style from './PageTitle.module.less'
import RowDefault from './RowDefault'

const PageTitle = ({ title, subtitle }) => (
  <>
    <RowDefault gutter='medium'>
      <ColumnAlone>
        <Title level={1} className={style.title}>
          {title}
        </Title>
        {subtitle && (
          <Title level={3} className={style.subtitle}>
            {subtitle}
          </Title>
        )}
      </ColumnAlone>
    </RowDefault>
  </>
)

export default PageTitle
