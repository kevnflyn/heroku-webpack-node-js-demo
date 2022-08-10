
export const NEWS_REQUEST = 'NEWS_REQUEST'
export const NEWS_SUCCESS = 'NEWS_SUCCESS'
export const NEWS_FAILURE = 'NEWS_FAILURE'
export const newsRequest = () => ({
  type: NEWS_REQUEST
})
export const newsSuccess = (news, query) => ({
  type: NEWS_SUCCESS,
  payload: { results: { news }, query }
})
export const newsFailure = error => ({
  type: NEWS_FAILURE,
  payload: { error }
})

export const INFINITE_NEWS_REQUEST = 'INFINITE_NEWS_REQUEST'
export const INFINITE_NEWS_SUCCESS = 'INFINITE_NEWS_SUCCESS'
export const INFINITE_NEWS_FAILURE = 'INFINITE_NEWS_FAILURE'
export const infiniteNewsRequest = () => ({
  type: INFINITE_NEWS_REQUEST
})
export const infiniteNewsSuccess = ({ news, totalCount }, query) => ({
  type: INFINITE_NEWS_SUCCESS,
  payload: { results: { news, totalCount }, query }
})
export const infiniteNewsFailure = error => ({
  type: INFINITE_NEWS_FAILURE,
  payload: { error }
})

export const RESET_INFINITE_NEWS = 'RESET_INFINITE_NEWS'
export const infiniteNewsReset = () => ({
  type: RESET_INFINITE_NEWS
})

export const NEWS_FILTERS_REQUEST = 'NEWS_FILTERS_REQUEST'
export const NEWS_FILTERS_SUCCESS = 'NEWS_FILTERS_SUCCESS'
export const NEWS_FILTERS_FAILURE = 'NEWS_FILTERS_FAILURE'
export const newsFiltersRequest = () => ({
  type: NEWS_FILTERS_REQUEST
})
export const newsFiltersSuccess = newsFilters => ({
  type: NEWS_FILTERS_SUCCESS,
  payload: { results: { newsFilters } }
})
export const newsFiltersFailure = error => ({
  type: NEWS_FILTERS_FAILURE,
  payload: { error }
})

export const NEWS_FILTER_SAVE_REQUEST = 'NEWS_FILTER_SAVE_REQUEST'
export const NEWS_FILTER_SAVE_SUCCESS = 'NEWS_FILTER_SAVE_SUCCESS'
export const NEWS_FILTER_SAVE_FAILURE = 'NEWS_FILTER_SAVE_FAILURE'
export const newsFilterSaveRequest = () => ({
  type: NEWS_FILTER_SAVE_REQUEST
})
export const newsFilterSaveSuccess = () => ({
  type: NEWS_FILTER_SAVE_SUCCESS
})
export const newsFilterSaveFailure = error => ({
  type: NEWS_FILTER_SAVE_FAILURE,
  payload: { error }
})

export const NEWS_FILTER_DELETE_REQUEST = 'NEWS_FILTER_DELETE_REQUEST'
export const NEWS_FILTER_DELETE_SUCCESS = 'NEWS_FILTER_DELETE_SUCCESS'
export const NEWS_FILTER_DELETE_FAILURE = 'NEWS_FILTER_DELETE_FAILURE'
export const newsFilterDeleteRequest = () => ({
  type: NEWS_FILTER_DELETE_REQUEST
})
export const newsFilterDeleteSuccess = id => ({
  type: NEWS_FILTER_DELETE_SUCCESS,
  payload: { id }
})
export const newsFilterDeleteFailure = error => ({
  type: NEWS_FILTER_DELETE_FAILURE,
  payload: { error }
})

export const ACTIVATE_PROFILE_NEWS = 'ACTIVATE_PROFILE_NEWS'
export const DEACTIVATE_PROFILE_NEWS = 'DEACTIVATE_PROFILE_NEWS'
export const profileNewsActivation = () => ({
  type: DEACTIVATE_PROFILE_NEWS
})
export const profileNewsDeactivation = () => ({
  type: DEACTIVATE_PROFILE_NEWS
})

export const SET_DEFAULT_QUERY = 'SET_DEFAULT_QUERY'
export const defaultQuerySet = defaultQuery => ({
  type: SET_DEFAULT_QUERY,
  payload: { defaultQuery }
})

export const SET_SCROLL_TO_NEWS_TARGET = 'SET_SCROLL_TO_NEWS_TARGET'
export const scrollToNewsItemTargetSet = id => ({
  type: SET_SCROLL_TO_NEWS_TARGET,
  payload: { id }
})

export const RESET_HAS_REQUESTED_INFINITE_NEWS = 'RESET_HAS_REQUESTED_INFINITE_NEWS'
export const hasRequestedInfiniteNewsReset = () => ({
  type: RESET_HAS_REQUESTED_INFINITE_NEWS
})

export const STORE_SEARCH_QUERY = 'STORE_SEARCH_QUERY'
export const searchQueryStore = payload => ({
  type: STORE_SEARCH_QUERY,
  payload
})

export const CLEAR_STORED_SEARCH_QUERY = 'CLEAR_STORED_SEARCH_QUERY'
export const searchQueryStoreClearing = payload => ({
  type: CLEAR_STORED_SEARCH_QUERY,
  payload
})

export const MARK_COMPLIANCE_ARTICLE_AS_READ = 'MARK_COMPLIANCE_ARTICLE_AS_READ'
export const complianceArticleReadMarking = articleId => ({
  type: MARK_COMPLIANCE_ARTICLE_AS_READ,
  payload: { articleId }
})
