import { startOfDay, startOfWeek, startOfMonth, startOfYear } from '../utils/dates'

const queryRange = date => ({ fromDatePublished: date.toISOString() })

const queryConstant = constant => ({ fromDatePublished: constant })

export default Object.freeze({
  TODAY: {
    aliasParams: queryConstant('TODAY'),
    dateRangeQuery: queryRange(startOfDay()),
    key: 'TODAY',
    label: 'Today'
  },
  THIS_WEEK: {
    aliasParams: queryConstant('THIS_WEEK'),
    dateRangeQuery: queryRange(startOfWeek()),
    key: 'THIS_WEEK',
    label: 'This Week'
  },
  THIS_MONTH: {
    aliasParams: queryConstant('THIS_MONTH'),
    dateRangeQuery: queryRange(startOfMonth()),
    key: 'THIS_MONTH',
    label: 'This Month'
  },
  THIS_YEAR: {
    aliasParams: queryConstant('THIS_YEAR'),
    dateRangeQuery: queryRange(startOfYear()),
    key: 'THIS_YEAR',
    label: 'This Year'
  },
  ALL_TIME: {
    aliasParams: queryConstant('ALL_TIME'),
    dateRangeQuery: queryRange((new Date('1970-01-01'))),
    key: 'ALL_TIME',
    label: 'All Time'
  }
})
