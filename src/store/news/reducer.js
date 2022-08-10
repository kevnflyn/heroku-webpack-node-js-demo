import {
  NEWS_REQUEST,
  NEWS_SUCCESS,
  NEWS_FAILURE,
  INFINITE_NEWS_REQUEST,
  INFINITE_NEWS_SUCCESS,
  INFINITE_NEWS_FAILURE,
  RESET_HAS_REQUESTED_INFINITE_NEWS,
  RESET_INFINITE_NEWS,
  NEWS_FILTERS_SUCCESS,
  NEWS_FILTER_DELETE_SUCCESS,
  ACTIVATE_PROFILE_NEWS,
  DEACTIVATE_PROFILE_NEWS,
  SET_DEFAULT_QUERY,
  SET_SCROLL_TO_NEWS_TARGET,
  STORE_SEARCH_QUERY,
  CLEAR_STORED_SEARCH_QUERY,
  MARK_COMPLIANCE_ARTICLE_AS_READ
} from './actions'

const requiredQuery = {
  size: 10,
  offset: 0
}

const initialNewsResults = {
  news: [],
  totalCount: null
}

const initialNewsState = {
  defaultQuery: requiredQuery,
  newsResults: initialNewsResults,
  hasNextPage: true, // initially set to true to trigger infinite news requests
  loading: false,
  newsFilters: [],
  isUsingProfile: true,
  storedSearchQuery: {},
  scrollToNewsItemTarget: null
}

export const newsReducer = (state = initialNewsState, action) => {
  switch (action.type) {
    case NEWS_REQUEST: {
      return {
        ...state
      }
    }

    case NEWS_SUCCESS: {
      return {
        ...state,
        newsResults: action.payload.results.newsResults
      }
    }

    case NEWS_FAILURE: {
      return {
        ...state
      }
    }

    case INFINITE_NEWS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case INFINITE_NEWS_SUCCESS: {
      const news = state.newsResults.news.concat(action.payload.results.news)
      const hasNextPage = !(news.length === action.payload.results.totalCount)
      return {
        ...state,
        newsResults: {
          ...state.newsResults,
          news
        },
        loading: false,
        hasNextPage
      }
    }

    case INFINITE_NEWS_FAILURE: {
      return {
        ...state,
        loading: false
      }
    }

    case RESET_HAS_REQUESTED_INFINITE_NEWS: {
      return {
        ...state,
        hasNextPage: true,
        newsResults: initialNewsResults
      }
    }

    case RESET_INFINITE_NEWS: {
      return {
        ...state,
        loading: true,
        newsResults: initialNewsResults
      }
    }

    case MARK_COMPLIANCE_ARTICLE_AS_READ: {
      return {
        ...state,
        newsResults: {
          ...state.newsResults,
          news: state.newsResults.news.map(
            newsArticle => newsArticle.id === action.payload.articleId
              ? {
                  ...newsArticle,
                  read: true
                }
              : newsArticle
          )
        }
      }
    }

    case NEWS_FILTERS_SUCCESS: {
      return {
        ...state,
        newsFilters: action.payload.results.newsFilters
      }
    }

    case NEWS_FILTER_DELETE_SUCCESS: {
      return {
        ...state,
        newsFilters: state.newsFilters
          .filter(filter => filter.id !== action.payload.id)
      }
    }

    case ACTIVATE_PROFILE_NEWS: {
      return {
        ...state,
        isUsingProfile: true
      }
    }

    case DEACTIVATE_PROFILE_NEWS: {
      return {
        ...state,
        isUsingProfile: false
      }
    }

    case SET_DEFAULT_QUERY: {
      return {
        ...state,
        defaultQuery: {
          ...requiredQuery,
          ...action.payload.defaultQuery
        }
      }
    }

    case SET_SCROLL_TO_NEWS_TARGET: {
      return {
        ...state,
        scrollToNewsItemTarget: action.payload.id
      }
    }

    case STORE_SEARCH_QUERY: {
      return {
        ...state,
        storedSearchQuery: action.payload
      }
    }

    case CLEAR_STORED_SEARCH_QUERY: {
      return {
        ...state,
        storedSearchQuery: {}
      }
    }

    default: {
      return state
    }
  }
}
