const express = require('express')

const newsApi = require('./apis/news')
const newsReadApi = require('./apis/newsRead')
const pinnedArticlesApi = require('./apis/pinnedArticles')
const regulationWatch = require('./apis/regulationWatch')
const userAlertsApi = require('./apis/userAlerts')
const usersApi = require('./apis/users')

const router = express.Router()

newsApi(router)
newsReadApi(router)
pinnedArticlesApi(router)
regulationWatch(router)
userAlertsApi(router)
usersApi(router)

module.exports = router
