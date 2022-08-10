
import { useEffect, useState } from 'react'

import { setDefaultQuery, setScrollToNewsItemTarget } from '../store/news/effects'
import { requestPinnedArticles, requestPinnedArticlesContent } from '../store/pinnedArticles/effects'
import { setActiveRegulationWatch } from '../store/regulationWatch/effects'
import { requestUserCompany } from '../store/user/effects'
import { useNewsState } from '../utils/redux'
import { useLocationFacade } from './useLocationFacade'
import { useRegulationWatchPage } from './useRegulationWatchPage'

const useSetupForNewsPage = () => {
  /**
   * Scroll down to the target news item if the hash tag contains a numeric ID.
  */

  const { hash } = useLocationFacade()

  useEffect(() => {
    const match = hash.match(/^#([0-9]+$)/)
    if (hash && match) {
      setScrollToNewsItemTarget(parseInt(match[1]))
    }
  }, [])

  /**
   * Reset active saved search menu so that no saved search looks active,
   * because it isn't.
  */

  useEffect(() => {
    setActiveRegulationWatch(null)
  }, [])

  /**
   * --------------------
   * Initialise news page
   * --------------------
   *
   * 1. Request auxiliary data such as user company and pinned articles.
   *
   * 2. set `defaultQuery` for future news requests.
   *
   * 3. Make initial news request with profile settings.
   */

  const [isNewsPageReady, setIsNewsPageReady] = useState()

  const { isUsingProfile } = useNewsState()

  const { setupRegulationWatchPage } = useRegulationWatchPage()

  useEffect(() => {
    const requestData = async () => {
      /**
       * Before requestPinnedArticlesContent() can be called, the request
       * requestPinnedArticles() must finish getting the IDs of the pinned
       * articles. */
      await requestPinnedArticles()
      requestPinnedArticlesContent()
      setupRegulationWatchPage()

      const {
        complianceAuthorities,
        countriesOperating
      } = await requestUserCompany()

      const profileQuery = {
        sources: complianceAuthorities,
        countries: countriesOperating
      }

      if (isUsingProfile) {
        setDefaultQuery(profileQuery)
      }

      setIsNewsPageReady(true)
    }

    requestData()
  }, [])

  return { isNewsPageReady }
}

export default useSetupForNewsPage
