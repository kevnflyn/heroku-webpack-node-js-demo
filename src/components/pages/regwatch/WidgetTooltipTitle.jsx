import React from 'react'

import Flex from 'styled-flex-component'

import Tooltip from '../../antd/Tooltip'

const WidgetTooltipTitle = ({
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
