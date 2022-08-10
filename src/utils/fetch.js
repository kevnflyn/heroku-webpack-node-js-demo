// import { getUrlParseObject } from './url'

const errorMessage = async response => {
  const { statusText, status, url } = response
  const { message } = await response.json()
  return {
    message,
    statusText,
    status,
    url
  }
}

const handleResponse = async (response, dataType) => {
  try {
    if (response.ok) {
      if (!dataType) return undefined

      if (dataType === 'application/octet-stream') {
        return await response.blob()
      }

      if (dataType === 'application/json') {
        return await response.json()
      }

      return undefined
    }
  } catch (error) {
    console.error('fetch response: ', response)
    console.error('fetch error: ', error)
    throw new Error(error)
  }

  throw await errorMessage(response)
}

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin', // include, *same-origin, omit
  mode: 'cors' // no-cors, *cors, same-origin
}

const blobOptions = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

// export const fetchWrapper = async url => {
//   const parsedUrl = getUrlParseObject(url)
//   parsedUrl.set('query', parsedUrl.query)
//   return await fetch(parsedUrl.toString())
// }

export const getRequest = async (url, options = defaultOptions) => (
  handleResponse(
    await fetch(url, { ...options, method: 'GET' }),
    options.headers['Content-Type']
  )
)

export const getBlobRequest = async (url, options = blobOptions) => (
  handleResponse(
    await fetch(url, { ...options, method: 'GET' }),
    options.headers['Content-Type']
  )
)

export const postRequest = async (url, body, options = defaultOptions) => (
  handleResponse(
    await fetch(url, { ...options, body: JSON.stringify(body), method: 'POST' }),
    options.headers['Content-Type']
  )
)

export const putRequest = async (url, body, options = defaultOptions) => (
  handleResponse(
    await fetch(url, { ...options, body: JSON.stringify(body), method: 'PUT' }),
    options.headers['Content-Type']
  )
)

export const deleteRequest = async (url, options = {
  ...defaultOptions,
  headers: {
    'Content-Type': 'text/plain'
  }
}) => (
  handleResponse(
    await fetch(url, { ...options, method: 'DELETE' })
  )
)
