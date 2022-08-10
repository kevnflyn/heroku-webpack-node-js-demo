import langs from '../maps/langs'

export const getNavigatorLanguage = () => {
  const regex = /([a-z]+)-[A-Z]+/
  const match = navigator.language.match(regex)
  if (match === null) {
    return null
  }
  const translatedLang = langs[match[1]]
  return translatedLang ? translatedLang.key : langs.en.key
}
