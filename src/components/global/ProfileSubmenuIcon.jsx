import React from 'react'

import { UserOutlined } from '@ant-design/icons'
import Flex from 'styled-flex-component'

import { useUserState } from '../../utils/redux'
import styles from './ProfileSubmenuIcon.module.less'

const ProfileSubmenuIcon = () => {
  const { user, userCompany } = useUserState()
  return (
    <Flex alignCenter>
      <UserOutlined style={{ marginRight: '16px', fontSize: '21px' }}/>
      <Flex className={styles.userInfoContainer} column justifyCenter>
        <b className={styles.userInfo}>
          {user.firstname} {user.lastname}
        </b>
        <div className={styles.userInfo}>
          {userCompany && userCompany.jobTitle}
        </div>
      </Flex>
    </Flex>
  )
}

export default ProfileSubmenuIcon
