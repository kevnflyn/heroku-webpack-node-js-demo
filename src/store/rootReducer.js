import { combineReducers } from 'redux'

import { networkReducer } from './network/reducer'
import { newsReducer } from './news/reducer'
import { newsUiReducer } from './newsUi/reducer'
import { pinnedArticlesReducer } from './pinnedArticles/reducer'
import { regulationWatchReducer } from './regulationWatch/reducer'
import { userReducer } from './user/reducer'
import { userAlertsReducer } from './userAlerts/reducer'

const rootReducer = combineReducers({
  networkState: networkReducer,
  newsState: newsReducer,
  newsUiState: newsUiReducer,
  pinnedArticlesState: pinnedArticlesReducer,
  regulationWatchState: regulationWatchReducer,
  userState: userReducer,
  userAlertsState: userAlertsReducer
})

export default rootReducer
