import { translationLocation, sourcesTranslationLocation, countriesTranslationLocation } from 'assetLocations'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { getRequest } from '../src/utils/fetch'

const createLocaleResource = async locale => [
  locale,
  {
    translation: await getRequest(translationLocation(locale)),
    sources: await getRequest(sourcesTranslationLocation(locale)),
    countries: await getRequest(countriesTranslationLocation(locale))
  }
]

let loadingResources = null

const loadResources = () => {
  loadingResources = Promise
    .all(['en', 'fr', 'de']
      .map(createLocaleResource))
}

loadResources()

export const initi18n = async locale => {
  const resources = await loadingResources

  return (
    i18next
    // pass the i18n instance to react-i18next.
      .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        lng: locale,
        supportedLngs: ['en', 'de', 'fr'],
        load: 'languageOnly',
        fallback: ['en'],
        ns: 'translation',
        resources: resources.reduce((
          mapping,
          [locale, resource]
        ) => ({
          ...mapping,
          [locale]: resource
        }), {})
      })
  )
}

export const t = i18next.t.bind(i18next)
