
export const NEWS_DRAWER_OPEN = 'NEWS_DRAWER_OPEN'
export const NEWS_DRAWER_CLOSE = 'NEWS_DRAWER_CLOSE'
export const newsDrawerOpen = newsItem => ({
  type: NEWS_DRAWER_OPEN,
  payload: { newsItem }
})
export const newsDrawerClose = () => ({
  type: NEWS_DRAWER_CLOSE
})
