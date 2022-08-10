const nodeFetch = require('node-fetch')

const internalFetch = (url, query) => {
  return nodeFetch(
  `${url}?internalToken=${process.env.INTERNAL_API_AUTH}&${query}`
  )
}

module.exports = internalFetch
