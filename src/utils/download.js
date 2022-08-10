import { getBlobRequest } from './fetch'

export const download = async url => {
  const response = await getBlobRequest(url)
  const fileName = encodeURIComponent(response.headers.get('content-disposition'))
  const fileBlob = await response.blob()
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(fileBlob))
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
