import routes from '../routes'

export const goToNews = (history, { search, hash } = {}) => {
  history.push({
    pathname: routes.news,
    search,
    hash
  })
}

export const goToLogin = history => {
  history.push({
    pathname: routes.login
  })
}

export const goToRegulationWatch = (history, activeRegulationWatch) => {
  history.push({
    pathname: routes.regwatch,
    state: { activeRegulationWatch }
  })
}
