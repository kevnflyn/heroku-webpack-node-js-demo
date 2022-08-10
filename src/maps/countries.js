import { orderBy } from '../utils/lodash'

const countries = t => ({
  eu: {
    label: t('countries:European Union'),
    abbreviation: t('countries:EU'),
    dbvalue: 'EU'
  },
  lux: {
    label: t('countries:Luxembourg'),
    abbreviation: t('countries:LUX'),
    dbvalue: 'Luxembourg'
  },
  int: {
    label: t('countries:International'),
    abbreviation: t('countries:INT'),
    dbvalue: 'International'
  }
})

export default t => Object.freeze(
  orderBy(
    countries(t),
    ['label'],
    ['asc']
  ).reduce((accumulator, value) => ({
    ...accumulator,
    [value.dbvalue]: value
  }), {})
)
