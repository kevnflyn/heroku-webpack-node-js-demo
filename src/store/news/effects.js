import { dispatch } from '../../utils/redux'
import store from '../store'
import {
  newsRequest,
  newsSuccess,
  newsFailure,
  infiniteNewsRequest,
  infiniteNewsSuccess,
  infiniteNewsFailure,
  infiniteNewsReset,
  hasRequestedInfiniteNewsReset,
  profileNewsActivation,
  profileNewsDeactivation,
  defaultQuerySet,
  scrollToNewsItemTargetSet,
  searchQueryStore,
  searchQueryStoreClearing,
  complianceArticleReadMarking
} from './actions'
import { getNews, getNewsRead, postNewsRead } from './newsService'

export const requestNews = async query => {
  dispatch(newsRequest())
  const { userState: { user: { lang: locale } } } = store.getState()
  try {
    const { news, totalCount } = await getNews(`${query}&locale=${locale}`)
    dispatch(newsSuccess({ news, totalCount }, query))
  } catch (error) {
    console.error(error)
    dispatch(newsFailure(error))
  }
}

export const requestInfiniteNews = async query => {
  dispatch(infiniteNewsRequest())
  const { userState: { user: { lang: locale } } } = store.getState()
  try {
    const { news, totalCount } = await getNews(`${query}&locale=${locale}`)
    const newsRead = await getNewsRead(news.map(({ id }) => id))
    const newsDataAndRead = news.map(newsArticle => (
      newsRead.find(({ articleId }) => articleId === newsArticle.id)
        ? { ...newsArticle, read: true }
        : { ...newsArticle, read: false }))
    dispatch(infiniteNewsSuccess({ news: newsDataAndRead, totalCount }, query))
  } catch (error) {
    console.error(error)
    dispatch(infiniteNewsFailure(error))
  }
}

export const markComplianceArticleAsRead = async articleId => {
  try {
    await postNewsRead(articleId)
    dispatch(complianceArticleReadMarking(articleId))
  } catch (error) {
    console.error(error)
  }
}

export const resetInfiniteNews = () => {
  dispatch(infiniteNewsReset())
}

export const activateProfileNews = () => {
  dispatch(profileNewsActivation())
}

export const deactivateProfileNews = () => {
  dispatch(profileNewsDeactivation())
}

export const setDefaultQuery = query => {
  dispatch(defaultQuerySet(query))
}

export const setScrollToNewsItemTarget = id => {
  dispatch(scrollToNewsItemTargetSet(id))
}

export const resetHasRequestedInfiniteNews = () => {
  dispatch(hasRequestedInfiniteNewsReset())
}

export const storeSearchQuery = payload => {
  dispatch(searchQueryStore(payload))
}

export const clearStoredSearchQuery = () => {
  dispatch(searchQueryStoreClearing())
}
