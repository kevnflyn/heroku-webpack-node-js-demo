// const productionHostname = 'http://www.getphare.com'
const productionHostname = 'http://164.92.192.121:31339'

const developmentHostname = 'http://localhost:3000'

const envNameToHostNameMap = {
  development: developmentHostname,
  production: productionHostname
}

const getHostname = env => {
  if (typeof env === 'string') {
    const hostname = envNameToHostNameMap[env]
    if (hostname) {
      return hostname
    }

    return envNameToHostNameMap[process.env.NODE_ENV]
  }

  return process.env.NODE_ENV === 'development'
    ? developmentHostname
    : productionHostname
}

module.exports = {
  getHostname
}
