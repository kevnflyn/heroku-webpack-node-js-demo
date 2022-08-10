import {
  NEWS_DRAWER_OPEN,
  NEWS_DRAWER_CLOSE
} from './actions'

const initialNewsState = {
  newsDrawer: {
    newsItem: null
  }
}

export const newsUiReducer = (state = initialNewsState, action) => {
  switch (action.type) {
    case NEWS_DRAWER_OPEN: {
      return {
        ...state,
        newsDrawer: {
          newsItem: action.payload.newsItem
        }
      }
    }

    case NEWS_DRAWER_CLOSE: {
      return {
        ...state,
        newsDrawer: {
          newsItem: null
        }
      }
    }

    default: {
      return state
    }
  }
}
