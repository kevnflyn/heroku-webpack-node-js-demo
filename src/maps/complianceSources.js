import { orderBy } from '../utils/lodash'

const complianceSourcesArray = t => [
  {
    label: t('sources:European Parliament'),
    abbreviation: t('sources:EP'),
    dbvalue: 'EP'
  },
  {
    label: t('sources:European Banking Authority'),
    abbreviation: t('sources:EBA'),
    dbvalue: 'EBA'
  },
  {
    label: t('sources:Commission de Surveillance du Secteur Financier'),
    abbreviation: t('sources:CSSF'),
    dbvalue: 'CSSF'
  },
  {
    label: t('sources:Financial Stability Board'),
    abbreviation: t('sources:FSB'),
    dbvalue: 'FSB'
  },
  {
    label: t('sources:European System Risk Board'),
    abbreviation: t('sources:ESRB'),
    dbvalue: 'ESRB'
  },
  {
    label: t('sources:Association of the Luxembourg Fund industry'),
    abbreviation: t('sources:ALFI'),
    dbvalue: 'ALFI'
  },
  {
    label: t('sources:European Central Bank'),
    abbreviation: t('sources:ECB'),
    dbvalue: 'ECB'
  },
  {
    label: t('sources:Commissariat Aux  Assurances'),
    abbreviation: t('sources:CAA'),
    dbvalue: 'CAA'
  },
  {
    label: t('sources:European Securities and Markets Authority'),
    abbreviation: t('sources:ESMA'),
    dbvalue: 'ESMA'
  },
  {
    label: t('sources:Cellule de Renseignement Financier'),
    abbreviation: t('sources:CRF'),
    dbvalue: 'CRF'
  },
  {
    label: t('sources:The Luxembourg Bankers Association'),
    abbreviation: t('sources:ABBL'),
    dbvalue: 'ABBL'
  },
  {
    label: t('sources:National Data Protection Commission'),
    abbreviation: t('sources:CNPD'),
    dbvalue: 'CNPD'
  },
  {
    label: t('sources:Banque centrale du Luxembourg'),
    abbreviation: t('sources:BCL'),
    dbvalue: 'BCL'
  },
  {
    label: t('sources:European Insurance and Occupational Pensions Authority'),
    abbreviation: t('sources:EIOPA'),
    dbvalue: 'EIOPA'
  },
  {
    label: t('sources:International Organization of Securities Commissions'),
    abbreviation: t('sources:IOSCO'),
    dbvalue: 'IOSCO'
  },
  {
    label: t('sources:Central European University'),
    abbreviation: t('sources:CEU'),
    dbvalue: 'CEU'
  },
  {
    label: t('sources:European Commission'),
    abbreviation: t('sources:EC'),
    dbvalue: 'EC'
  }
]

export default t => Object.freeze(
  orderBy(
    complianceSourcesArray(t),
    ['label'],
    ['asc']
  ).reduce((accumulator, value) => ({
    ...accumulator,
    [value.dbvalue]: value
  }), {})
)
