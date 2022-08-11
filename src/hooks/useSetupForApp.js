
import { useEffect, useState } from 'react'

import { initi18n } from '../../i18n/i18n'
import { clientStorageLocale } from '../services/clientStorageLocale'
import { alignUserLocaleWithApplication, requestSessionUser } from '../store/user/effects'
import { getNavigatorLanguage } from '../utils/navigatorLanguage'

const useSetupForApp = () => {
  const [applicationInitialised, setApplicationInitialised] = useState(false)

  useEffect(() => {
    /**
     * ---------------------------------------------
     * Setting Application Language Before Rendering
     * ---------------------------------------------
     *
     * There is a try-catch block where we attempt to setup up the application
     * for the authenticated user and then the unauthenticated user.
     *
     * For the authenticated user:
     *
     *    1. alignUserLocaleWithApplication() is called - if the unauthenticated
     *       user previously changed the language setting, once they are logged
     *       in, we will save the locally stored language in the users table.
     *
     *    2. We request the session user's data.
     *
     *    3. Their language is set.
     *
     * For the unauthenticated user:
     *
     *    1. If the first request fails, the programme flow enters the catch
     *       block.
     *
     *    2. We check if there is a locale stored because the unauthenticated
     *       user set their language preference.
     *
     *    3. If there is no language preference setting, we will take the
     *       native language setting found in the browser's navigation object.
     *
     *    4. A language must always be stored in the browser's localstorage.
     *       When calling updateUserLocale() the browser's localstorage is
     *        updated.
     *       When calling alignUserLocaleWithApplication() the DB is updated.
     *       alignUserLocaleWithApplication() is called when logging in or on
     *       page refreshes.
     *
     *    4. The language is set.
     */

    const getUserInfo = async () => {
      try {
        const { lang } = await requestSessionUser()

        const { lang: appLang } = await alignUserLocaleWithApplication({ lang })

        await initi18n(appLang)
      } catch (error) {
        let locale = clientStorageLocale.getLocale()

        if (!locale) {
          const navLang = { lang: getNavigatorLanguage() }
          locale = navLang
          clientStorageLocale.setLocale(locale)
        }

        await initi18n(locale.lang)
      }
      setApplicationInitialised(true)
    }
    getUserInfo()
  }, [])

  return {
    applicationInitialised
  }
}

export default useSetupForApp
