import React from 'react'

import Flex from 'styled-flex-component'

import Button from '../../antd/Button'
import Tooltip from '../../antd/Tooltip'

const WidgetTooltipTitle = ({
  // icon,
  tooltipTitle,
  widgetTitle,
  buttons,
  alignCenter,
  alignStart
}) => {
  return (
    <Flex
      justifyBetween
      style={{ width: '100%' }}
    >
      <Tooltip
        title={tooltipTitle}
        placement='bottomLeft'
      >
        <div>
          <Flex
            style={{ gap: '8px' }}
            alignCenter={alignCenter}
            alignStart={alignStart}
          >
            {/* <Button
              shape='circle'
              type='tertiary'
            >
              {icon}
            </Button> */}
            <span>
              {widgetTitle}
            </span>
          </Flex>
        </div>
      </Tooltip>
      <div>
        {buttons}
      </div>
    </Flex>
  )
}

export default WidgetTooltipTitle
