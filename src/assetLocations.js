const base = window.location.origin

const translationsBase = `${base}/assets/translations`

export const translationLocation = locale => `${translationsBase}/${locale}/translation.json`

export const sourcesTranslationLocation = locale => `${translationsBase}/${locale}/sources.json`

export const countriesTranslationLocation = locale => `${translationsBase}/${locale}/countries.json`
