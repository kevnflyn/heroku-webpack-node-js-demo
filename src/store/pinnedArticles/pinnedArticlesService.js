import { pinnedArticlesApi } from '../../endpoints'
import { getRequest, putRequest } from '../../utils/fetch'

export const getPinnedArticles = () => getRequest(pinnedArticlesApi)

export const putPinnedArticles = pinnedArticles => (
  putRequest(pinnedArticlesApi, { pinnedArticles })
)
