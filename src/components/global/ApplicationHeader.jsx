import React from 'react'

import { GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Flex from 'styled-flex-component'

import routes from '../../routes'
import { useUserState } from '../../utils/redux'
import Menu from '../antd/Menu'
import Typography from '../antd/Typography'
import BrandIconPurple from '../imagery/BrandIconPurple'
import ColDefault from '../layout/ColDefault'
import HeaderHorizontalLight from '../layout/HeaderHorizontalLight'
import PageAlignment from '../layout/PageAlignment'
import RowDefault from '../layout/RowDefault'
import Link from '../navigation/Link'
import SignUpPrimary from '../navigation/SignUpPrimary'
import ApplicationLocaleForm from '../pages/profile/ApplicationLocaleForm'
import UserLocaleForm from '../pages/profile/UserLocaleForm'
import AboutUs from './AboutUs'
import HeaderLink from './HeaderLink'
import LogoutButton from './LogoutButton'
import MenuItemCard from './MenuItemCard'
import ProfileSubmenuIcon from './ProfileSubmenuIcon'

const { Title } = Typography
const { SubMenu } = Menu

const ApplicationHeader = () => {
  const { user } = useUserState()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  return (
    <HeaderHorizontalLight>
      <PageAlignment>
        <RowDefault>
          <ColDefault span='2'>
            <Flex width='100%' style={{ height: '100%' }} alignCenter>
              <Title level={3} style={{ margin: 0, paddingLeft: 2 }}>
                <Link to={routes.home}>
                  <BrandIconPurple size='1.6em'/>
                </Link>
              </Title>
            </Flex>
          </ColDefault>
          <ColDefault span='10'>
            <Flex width='100%' style={{ height: '100%' }} alignCenter>
              {user !== null && (
                <Menu
                  mode="horizontal"
                  theme='light'
                  selectedKeys={[pathname]}
                >
                  <Menu.Item key={routes.about}>
                    <AboutUs/>
                  </Menu.Item>
                  <Menu.Item key={routes.about}>
                    <HeaderLink route={routes.news}>
                      {t('Reg. Watch')}
                    </HeaderLink>
                  </Menu.Item>
                </Menu>
              )}
            </Flex>
          </ColDefault>
          <ColDefault span='12'>
            <Flex
              width='100%'
              style={{ height: '100%' }}
              alignCenter
              justifyEnd
            >
              {user !== null && (
                <Menu
                  mode="horizontal"
                  theme='light'
                  selectedKeys={[pathname]}
                >
                  <MenuItemCard renderCardBody={() => <UserLocaleForm/>}>
                    <GlobalOutlined/>
                  </MenuItemCard>
                  <SubMenu
                    key="sub_menu"
                    icon={<ProfileSubmenuIcon/>}
                  >
                    <Menu.Item
                      key={routes.profile}
                      disabled={pathname === routes.profile}
                    >
                      <Link to={routes.profile}>
                        {t('Profile Settings')}
                      </Link>
                    </Menu.Item>
                    <Menu.Item key='logout'>
                      <LogoutButton/>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              )}
              {user === null && (
                <>
                  <Menu
                    mode="horizontal"
                    theme='light'
                    selectedKeys={[pathname]}
                  >
                    <MenuItemCard renderCardBody={
                      () => <ApplicationLocaleForm/>}>
                      <GlobalOutlined/>
                    </MenuItemCard>
                    <Menu.Item key={routes.login}>
                      <Link to={routes.login}>{t('Log in')}</Link>
                    </Menu.Item>
                  </Menu>
                  <SignUpPrimary/>
                </>
              )}
            </Flex>
          </ColDefault>
        </RowDefault>
      </PageAlignment>
    </HeaderHorizontalLight>
  )
}

export default ApplicationHeader
