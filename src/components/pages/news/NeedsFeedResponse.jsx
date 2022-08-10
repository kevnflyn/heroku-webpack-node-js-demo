import React from 'react'

import ResizeObserver from 'rc-resize-observer'
import { withTranslation } from 'react-i18next'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import VList from 'react-virtualized/dist/commonjs/List'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'

import List from '../../antd/List'
import { NotificationInfo } from '../../antd/notifications'
import Spin from '../../antd/Spin'
import styles from './NewsFeed.module.less'
import NewsItem from './NewsItem'
// import Bookmark from '../../buttons/Bookmark'

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
})

class NewsFeed extends React.Component {
  loadedRowsMap = {};

  componentDidMount () {
    this.props.loadMoreNews()
  }

  componentDidUpdate () {
    // If props/state signals that the underlying collection has changed,
    // Reload the most recently requested batch of rows:
    if (this.props.reloading) {
      this.loadedRowsMap = {}
    }
  }

  fetchData = callback => {
    this.props.loadMoreNews()
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    const { news, total, t } = this.props
    for (let i = startIndex; i <= stopIndex; i++) {
      this.loadedRowsMap[i] = 1
    }
    if (news.length > total) {
      NotificationInfo({
        message: t('No more news items'),
        description: t('Either your a speed reader or there\'s just not a lot of news')
      })
    } else {
      this.fetchData()
    }
  }

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  rowRenderer = ({ index, parent, key, style }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div key={key} style={style}>
            <ResizeObserver onResize={measure}>
              <NewsItem
                news={this.props.news[index]}
                key={key}
              />
            </ResizeObserver>
          </div>
        )}
      </CellMeasurer>
    )
  };

  render () {
    const { news } = this.props
    const vlist = props => (
      <VList
        {...props}
        deferredMeasurementCache={cache}
        rowHeight={cache.rowHeight}
        rowRenderer={this.rowRenderer}
        autoHeight
        overscanRowCount={100}
        rowCount={news.length}
      />
    )
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width
          })
        }
      </AutoSizer>
    )
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={news.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered
          })
        }
      </InfiniteLoader>
    )
    return (
      <div className={styles.newsFeed}>
        <List>
          {news.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        </List>
        {this.props.loading && <Spin/>}
      </div>
    )
  }
}

export default withTranslation(NewsFeed)
