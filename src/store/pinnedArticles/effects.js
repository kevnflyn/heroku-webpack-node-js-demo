import { dispatch } from '../../utils/redux'
import { getNewsItem } from '../news/newsService'
import store from '../store'
import {
  pinnedArticlesRequest,
  pinnedArticlesSuccess,
  pinnedArticlesFailure,
  putPinnedArticlesRequest,
  putPinnedArticlesSuccess,
  putPinnedArticlesFailure,
  pinnedArticlesContentRequest,
  pinnedArticlesContentSuccess,
  pinnedArticlesContentFailure
} from './actions'
import {
  getPinnedArticles,
  putPinnedArticles
} from './pinnedArticlesService'

export const requestPinnedArticles = async () => {
  dispatch(pinnedArticlesRequest())
  try {
    const pinnedArticles = await getPinnedArticles()
    dispatch(pinnedArticlesSuccess(pinnedArticles))
    return pinnedArticles
  } catch (error) {
    console.error(error)
    dispatch(pinnedArticlesFailure(error))
    throw error
  }
}

export const updatePinnedArticles = async pinnedArticles => {
  dispatch(putPinnedArticlesRequest())
  try {
    const response = await putPinnedArticles(pinnedArticles)
    dispatch(putPinnedArticlesSuccess(response))
    return response
  } catch (error) {
    console.error(error)
    dispatch(putPinnedArticlesFailure(error))
    throw error
  }
}

export const requestPinnedArticlesContent = async () => {
  dispatch(pinnedArticlesContentRequest())
  try {
    const {
      pinnedArticlesState: {
        pinnedArticles: {
          pinnedArticles
        },
        pinnedArticlesItemsMap
      }
    } = store.getState()

    const pinnedArticlesRequested = await Promise.all(
      pinnedArticles.map(pinnedArticleId => (
        pinnedArticlesItemsMap[pinnedArticleId] || getNewsItem(pinnedArticleId)
      ), [])
    )

    const pinnedArticlesRequestedMap = pinnedArticles
      .reduce((pinnedArticleItems, pinnedArticleId, index) => ({
        ...pinnedArticleItems,
        [pinnedArticleId]: pinnedArticlesRequested[index]
      }), {})

    dispatch(pinnedArticlesContentSuccess(pinnedArticlesRequestedMap))
    return pinnedArticlesItemsMap
  } catch (error) {
    console.error(error)
    dispatch(pinnedArticlesContentFailure(error))
    throw error
  }
}
