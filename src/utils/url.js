
import urlParse from 'url-parse'

export const replaceSearch = (history, query) => {
  history.replace({
    pathname: history.location.pathname,
    search: query
  })
}

export const getUrlParseObject = url => urlParse(url)
