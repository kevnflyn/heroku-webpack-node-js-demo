import { newsApi, newsArticleApi, newsReadApi } from '../../endpoints'
import { getRequest, postRequest } from '../../utils/fetch'
import { stringifyQuery } from '../../utils/queryString'

export const getNews = query => (
  getRequest(`${newsApi}${query}`)
)

export const getNewsItem = newsId => (
  getRequest(newsArticleApi(newsId))
)

export const getNewsRead = articleIds => {
  const query = stringifyQuery({ articleIds })
  return getRequest(`${newsReadApi}?${query}`)
}

export const postNewsRead = articleId => (
  postRequest(`${newsReadApi}`, { articleId })
)
