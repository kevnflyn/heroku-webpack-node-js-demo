import React from 'react'

import { SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
// import Flex from 'styled-flex-component'

// import useInfiniteNews from '../../../hooks/useInfiniteNews'
// import useUserProfile from '../../../hooks/useUserProfile'
import routes from '../../../routes'
// import { activateProfileNews, deactivateProfileNews, setDefaultQuery } from '../../../store/news/effects'
// import { useNewsState } from '../../../utils/redux'
import Space from '../../antd/Space'
// import Switch from '../../antd/Switch'
import Tooltip from '../../antd/Tooltip'
import Link from '../../navigation/Link'
import NewsProfileSearchCount from './NewsProfileSearchCount'
import NewsWidget from './NewsWidget'

/** ToDo: Delete this component
 * HOWEVER, you can use it as a template when saved searches are created
*/

const NewsProfileWidget = () => {
  // const { isUsingProfile } = useNewsState()

  // const { profileQuery } = useUserProfile()

  // const { loadInfiniteNewsFromStart } = useInfiniteNews()

  // const onChange = useCallback(hasProfileNews => {
  //   if (hasProfileNews) {
  //     activateProfileNews()
  //     setDefaultQuery(profileQuery)
  //     loadInfiniteNewsFromStart({})
  //   } else {
  //     deactivateProfileNews()
  //     setDefaultQuery({})
  //     loadInfiniteNewsFromStart({})
  //   }
  // }, [
  //   profileQuery,
  //   loadInfiniteNewsFromStart
  // ])

  const { t } = useTranslation()

  return (
    <NewsWidget>
      <Space direction='vertical'>
        <Tooltip
          title={t('We use the profile settings you have provided to us as a filter on your search results (i.e. compliance sources and countries).')}
          placement='bottom'
        >
          <Link to={routes.profile}>
            <b>{t('Profile')}</b>
            <span style={{ float: 'right' }}>
              <SettingOutlined/>
            </span>
          </Link>
        </Tooltip>
        {/* <Switch
          defaultChecked={isUsingProfile}
          onChange={onChange}
          checkedChildren={<SearchOutlined/>}
          unCheckedChildren={<SearchOutlined/>}
        /> */}
        <NewsProfileSearchCount/>
      </Space>
    </NewsWidget>
  )
}

export default NewsProfileWidget
