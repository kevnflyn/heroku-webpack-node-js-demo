import { dispatch } from '../../utils/redux'
import { markComplianceArticleAsRead } from '../news/effects'
import {
  newsDrawerOpen,
  newsDrawerClose
} from './actions'

export const openNewsDrawer = newsItem => {
  dispatch(newsDrawerOpen(newsItem))
  markComplianceArticleAsRead(newsItem.id)
}

export const closeNewsDrawer = () => {
  dispatch(newsDrawerClose())
}
