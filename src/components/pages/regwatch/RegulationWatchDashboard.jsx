import React from 'react'

import { Responsive, WidthProvider } from 'react-grid-layout'
import Flex from 'styled-flex-component'

import NewsDrawer from '../news/NewsDrawer'
import DocumentsWidget from './DocumentsWidget'
import RegulationTimelineWidget from './RegulationTimelineWidget'
import RegulationWatchAlertsWidget from './RegulationWatchAlertsWidget'
import RegulationWatchMenuWidget from './RegulationWatchMenuWidget'
import RegulationWatchTitleWidget from './RegulationWatchTitleWidget'

const ResponsiveGridLayout = WidthProvider(Responsive)

const RegWatchDashboard = () => {
  const layouts = {
    xxs: [
      { i: 'title-news', x: 0, y: 0, w: 12, h: 2, isDraggable: false },
      { i: 'news_feeds', x: 0, y: 0, w: 12, h: 4, isDraggable: false },
      // { i: 'networking', x: 4, y: 0, w: 5, h: 2, isDraggable: false },
      { i: 'nav-widget', x: 0, y: 0, w: 12, h: 2, isDraggable: false },
      { i: 'alert-widg', x: 0, y: 0, w: 12, h: 2, isDraggable: false }
    ],
    xs: [
      { i: 'title-news', x: 0, y: 0, w: 6, h: 2, isDraggable: false },
      { i: 'news_feeds', x: 0, y: 0, w: 6, h: 2, isDraggable: false },
      // { i: 'networking', x: 4, y: 0, w: 5, h: 2, isDraggable: false },
      { i: 'nav-widget', x: 6, y: 0, w: 6, h: 2, isDraggable: false },
      { i: 'alert-widg', x: 6, y: 0, w: 6, h: 2, isDraggable: false }
    ],
    sm: [
      { i: 'title-news', x: 0, y: 0, w: 3, h: 4, isDraggable: false },
      { i: 'news_feeds', x: 3, y: 0, w: 5, h: 4, isDraggable: false },
      // { i: 'networking', x: 4, y: 0, w: 5, h: 2, isDraggable: false },
      { i: 'nav-widget', x: 8, y: 0, w: 4, h: 2, isDraggable: false },
      { i: 'alert-widg', x: 8, y: 0, w: 4, h: 2, isDraggable: false }
    ],
    md: [
      { i: 'title-news', x: 0, y: 0, w: 4, h: 4, isDraggable: false },
      { i: 'news_feeds', x: 4, y: 0, w: 5, h: 4, isDraggable: false },
      // { i: 'networking', x: 4, y: 0, w: 5, h: 2, isDraggable: false },
      { i: 'nav-widget', x: 9, y: 0, w: 3, h: 2, isDraggable: false },
      { i: 'alert-widg', x: 9, y: 0, w: 3, h: 2, isDraggable: false }
    ],
    lg: [
      { i: 'title-news', x: 0, y: 0, w: 4, h: 4, isDraggable: false },
      { i: 'news_feeds', x: 4, y: 0, w: 5, h: 4, isDraggable: false },
      // { i: 'networking', x: 4, y: 0, w: 5, h: 2, isDraggable: false },
      { i: 'nav-widget', x: 9, y: 0, w: 3, h: 2, isDraggable: false },
      { i: 'alert-widg', x: 9, y: 0, w: 3, h: 2, isDraggable: false }
    ]
  }

  return (
    <>
      <NewsDrawer col={8}/>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ xxs: 12, xs: 12, sm: 12, md: 12, lg: 12 }}
        containerPadding={[0, 0]}
      >
        <div key="title-news">
          <Flex column style={{ height: '100%' }}>
            <div style={{ height: '100px', paddingBottom: '10px' }}>
              <RegulationWatchTitleWidget/>
            </div>
            <div style={{ height: 'calc(100% - 100px)' }}>
              <DocumentsWidget/>
            </div>
          </Flex>
        </div>
        <div key="news_feeds">
          <RegulationTimelineWidget/>
        </div>
        {/* <div key="networking">
          <RegulationWatchWidget title='Network'/>
        </div> */}
        <div key="nav-widget">
          <RegulationWatchMenuWidget/>
        </div>
        <div key="alert-widg">
          <RegulationWatchAlertsWidget/>
        </div>
      </ResponsiveGridLayout>
    </>
  )
}

export default RegWatchDashboard
