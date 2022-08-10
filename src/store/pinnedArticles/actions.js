export const GET_PINNED_ARTICLES_REQUEST = 'GET_PINNED_ARTICLES_REQUEST'
export const GET_PINNED_ARTICLES_SUCCESS = 'GET_PINNED_ARTICLES_SUCCESS'
export const GET_PINNED_ARTICLES_FAILURE = 'GET_PINNED_ARTICLES_FAILURE'
export const pinnedArticlesRequest = () => ({
  type: GET_PINNED_ARTICLES_REQUEST
})
export const pinnedArticlesSuccess = pinnedArticles => ({
  type: GET_PINNED_ARTICLES_SUCCESS,
  payload: { results: { pinnedArticles } }
})
export const pinnedArticlesFailure = error => ({
  type: GET_PINNED_ARTICLES_FAILURE,
  payload: { error }
})

export const PUT_PINNED_ARTICLES_REQUEST = 'PUT_PINNED_ARTICLES_REQUEST'
export const PUT_PINNED_ARTICLES_SUCCESS = 'PUT_PINNED_ARTICLES_SUCCESS'
export const PUT_PINNED_ARTICLES_FAILURE = 'PUT_PINNED_ARTICLES_FAILURE'
export const putPinnedArticlesRequest = () => ({
  type: PUT_PINNED_ARTICLES_REQUEST
})
export const putPinnedArticlesSuccess = pinnedArticles => ({
  type: PUT_PINNED_ARTICLES_SUCCESS,
  payload: { results: { pinnedArticles } }
})
export const putPinnedArticlesFailure = error => ({
  type: PUT_PINNED_ARTICLES_FAILURE,
  payload: { error }
})

export const GET_PINNED_ARTICLES_CONTENT_REQUEST = 'GET_PINNED_ARTICLES_CONTENT_REQUEST'
export const GET_PINNED_ARTICLES_CONTENT_SUCCESS = 'GET_PINNED_ARTICLES_CONTENT_SUCCESS'
export const GET_PINNED_ARTICLES_CONTENT_FAILURE = 'GET_PINNED_ARTICLES_CONTENT_FAILURE'
export const pinnedArticlesContentRequest = () => ({
  type: GET_PINNED_ARTICLES_CONTENT_REQUEST
})
export const pinnedArticlesContentSuccess = pinnedArticlesItemsMap => ({
  type: GET_PINNED_ARTICLES_CONTENT_SUCCESS,
  payload: { results: { pinnedArticlesItemsMap } }
})
export const pinnedArticlesContentFailure = error => ({
  type: GET_PINNED_ARTICLES_CONTENT_FAILURE,
  payload: { error }
})
