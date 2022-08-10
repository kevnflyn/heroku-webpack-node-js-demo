import React from 'react'

import style from './Dashboard.module.less'

const Dashboard = ({ children }) => (
  <div className={style.dashboard}>
    {children}
  </div>
)

export default Dashboard
