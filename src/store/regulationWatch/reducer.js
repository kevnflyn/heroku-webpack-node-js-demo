import {
  REGULATION_WATCHES_SUCCESS,
  DELETE_REGULATION_WATCH_SUCCESS,
  SET_ACTIVE_REGULATION_WATCH,
  REPLACE_REGULATION_WATCH_NAME_SUCCESS,
  REPLACE_STARRED_REGULATION_WATCH_REGULATION_SUCCESS,
  REPLACE_REGULATION_WATCH_DAILY_ALERT_SUCCESS,
  ENABLE_REGULATION_WATCH_ALERTS_SUCCESS,
  UPDATE_REGULATION_WATCH_SUCCESS
} from './actions'

const initialState = {
  regulationWatches: [],
  activeRegulationWatch: null
}

export const regulationWatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGULATION_WATCHES_SUCCESS: {
      return {
        ...state,
        regulationWatches: action.payload.results.regulationWatches
      }
    }

    case UPDATE_REGULATION_WATCH_SUCCESS: {
      const { regulationWatch: changedRegulationWatch } = action.payload.results
      return {
        ...state,
        regulationWatches: state.regulationWatches.map(regulationWatch => (
          changedRegulationWatch.regulationWatchId ===
          regulationWatch.regulationWatchId
            ? changedRegulationWatch
            : regulationWatch
        ))
      }
    }

    case DELETE_REGULATION_WATCH_SUCCESS: {
      const { regulationWatchId: deletedRegulationWatchId } = action.payload
      return {
        ...state,
        activeRegulationWatch: (
          state.activeRegulationWatch &&
          state.activeRegulationWatch.regulationWatchId ===
          deletedRegulationWatchId
            ? null
            : state.activeRegulationWatch
        ),
        regulationWatches: state
          .regulationWatches
          .reduce((watches, regulationWatch) => {
            if (
              regulationWatch.regulationWatchId === deletedRegulationWatchId
            ) {
              return watches
            }

            return [...watches, regulationWatch]
          }, [])
      }
    }

    case REPLACE_REGULATION_WATCH_NAME_SUCCESS:
    case REPLACE_REGULATION_WATCH_DAILY_ALERT_SUCCESS:
    case ENABLE_REGULATION_WATCH_ALERTS_SUCCESS: {
      const {
        regulationWatch: newRegulationWatch
      } = action.payload.results

      const {
        regulationWatchId: activeRegulationWatchId
      } = state.activeRegulationWatch

      return {
        ...state,
        activeRegulationWatch: (
          activeRegulationWatchId === newRegulationWatch.regulationWatchId
            ? newRegulationWatch
            : state.activeRegulationWatch
        ),
        regulationWatches: state
          .regulationWatches
          .map(regulationWatch => (
            regulationWatch.regulationWatchId ===
              newRegulationWatch.regulationWatchId
              ? newRegulationWatch
              : regulationWatch
          ), [])
      }
    }

    case REPLACE_STARRED_REGULATION_WATCH_REGULATION_SUCCESS: {
      const {
        regulationWatch: restarredRegulationWatch
      } = action.payload.results

      const {
        regulationWatchId: activeRegulationWatchId
      } = state.activeRegulationWatch

      return {
        ...state,
        activeRegulationWatch: (
          activeRegulationWatchId === restarredRegulationWatch.regulationWatchId
            ? restarredRegulationWatch
            : state.activeRegulationWatch
        ),
        regulationWatches: state
          .regulationWatches
          .reduce((watches, regulationWatch) => {
            if (
              regulationWatch.regulationWatchId ===
              restarredRegulationWatch.regulationWatchId
            ) {
              return [...watches, restarredRegulationWatch]
            }

            return [...watches, regulationWatch]
          }, [])
      }
    }

    case SET_ACTIVE_REGULATION_WATCH: {
      return {
        ...state,
        activeRegulationWatch: action.payload.regulationWatch
      }
    }

    default: {
      return state
    }
  }
}
