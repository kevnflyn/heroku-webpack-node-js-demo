import queryString from 'query-string'

const universalOptions = { arrayFormat: 'bracket' }

export const stringifyQuery = object => queryString
  .stringify(object, universalOptions)

export const parseQuery = string => queryString
  .parse(string, universalOptions)
