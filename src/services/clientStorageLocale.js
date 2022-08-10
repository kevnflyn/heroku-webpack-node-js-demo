
const clientStorageLocaleName = 'phareClientLocale'

export const clientStorageLocale = {
  getLocale: () => {
    const locale = localStorage.getItem(clientStorageLocaleName)
    if (locale === null) {
      return null
    }
    return JSON.parse(locale)
  },

  setLocale: locale => localStorage.setItem(
    clientStorageLocaleName,
    JSON.stringify(locale)
  )
}
