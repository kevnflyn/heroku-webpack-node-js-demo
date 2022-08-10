
import { useSelector } from 'react-redux'

import store from '../store/store'

export const dispatch = action => store.dispatch(action)

export const useNewsState = () => useSelector(state => state.newsState)

export const useNewsUiState = () => useSelector(state => state.newsUiState)

export const useRegulationWatchState = () => useSelector(state => state.regulationWatchState)

export const useUserState = () => useSelector(state => state.userState)

export const useUserAlertsState = () => useSelector(state => state.userAlertsState)

export const useNetworkState = () => useSelector(state => state.networkState)

export const usePinnedArticlesState = () => useSelector(state => state.pinnedArticlesState)
