import React from 'react'

import SlideOpen from '../animation/SlideOpen'
import ButtonLink from '../antd/ButtonLink'
import Card from '../antd/Card'
import MenuItem from './MenuItem'

const MenuItemCard = ({ children, renderCardBody, ...props }) => (
  <MenuItem {...props} render={({ inFocus }) => (
    <ButtonLink>
      <SlideOpen
        overlay={
          <Card bodyStyle={{ padding: '16px', width: '160px' }}>
            {renderCardBody()}
          </Card>
        }
        isOpen={inFocus}
      >
        {children}
      </SlideOpen>
    </ButtonLink>
  )}/>
)

export default MenuItemCard
