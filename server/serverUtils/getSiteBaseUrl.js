const baseRoute = 'app'

const getSitePrivateUrl = hostname => {
  return baseRoute ? `${hostname}/app` : hostname
}

const getSitePublicUrl = hostname => hostname

module.exports = {
  getSitePrivateUrl,
  getSitePublicUrl,
  baseRoute
}
