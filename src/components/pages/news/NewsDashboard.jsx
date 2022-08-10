import React, { useMemo } from 'react'

import { Responsive, WidthProvider } from 'react-grid-layout'

import RegulationWatchMenuWidget from '../regwatch/RegulationWatchMenuWidget'
import NewsDrawer from './NewsDrawer'
import NewsFeedFiltersWidget from './NewsFeedFiltersWidget'
import NewsFeedWidget from './NewsFeedWidget'
import Space from '../../antd/Space';

const ResponsiveGridLayout = WidthProvider(Responsive)

const NewsDashboard = () => {
  const layouts = useMemo(() => ({
    xxs: [
      { i: 'menu_widget', x: 0, y: 0, w: 12, h: 4.5, isDraggable: false },
      { i: 'result_wigt', x: 0, y: 0, w: 12, h: 5, isDraggable: false }
    ],
    xs: [
      { i: 'menu_widget', x: 2, y: 0, w: 8, h: 4.5, isDraggable: false },
      { i: 'result_wigt', x: 0, y: 0, w: 12, h: 5, isDraggable: false }
    ],
    sm: [
      { i: 'menu_widget', x: 3, y: 0, w: 6, h: 4.5, isDraggable: false },
      { i: 'result_wigt', x: 7, y: 0, w: 7, h: 5, isDraggable: false }
    ],
    md: [
      { i: 'menu_widget', x: 0, y: 0, w: 4, h: 4.5, isDraggable: false },
      { i: 'result_wigt', x: 4, y: 0, w: 8, h: 5, isDraggable: false }
    ],
    lg: [
      { i: 'menu_widget', x: 0, y: 0, w: 3, h: 4.5, isDraggable: false },
      { i: 'result_wigt', x: 3, y: 0, w: 7, h: 5, isDraggable: false }
    ]
  }), [])

  return (
    <>
      <NewsDrawer col={8}/>
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ xxs: 12, xs: 12, sm: 12, md: 12, lg: 12 }}
        containerPadding={[0, 0]}
      >
        <div key='menu_widget'>
          <Space direction='vertical' size={16}>
            <NewsFeedFiltersWidget/>
            <RegulationWatchMenuWidget/>
          </Space>
        </div>
        <div key='result_wigt'>
          <NewsFeedWidget/>
        </div>
      </ResponsiveGridLayout>
    </>
  )
}

export default NewsDashboard
