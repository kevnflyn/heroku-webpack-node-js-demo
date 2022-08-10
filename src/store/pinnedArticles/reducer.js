import {
  GET_PINNED_ARTICLES_SUCCESS,
  PUT_PINNED_ARTICLES_SUCCESS,
  GET_PINNED_ARTICLES_CONTENT_SUCCESS
} from './actions'

const initialState = {
  pinnedArticles: {
    pinnedArticles: []
  },
  pinnedArticlesItemsMap: {}
}

export const pinnedArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PINNED_ARTICLES_SUCCESS:
    case PUT_PINNED_ARTICLES_SUCCESS: {
      return {
        ...state,
        pinnedArticles: action.payload.results.pinnedArticles
      }
    }

    case GET_PINNED_ARTICLES_CONTENT_SUCCESS: {
      return {
        ...state,
        pinnedArticlesItemsMap: action.payload.results.pinnedArticlesItemsMap
      }
    }

    default: {
      return state
    }
  }
}
