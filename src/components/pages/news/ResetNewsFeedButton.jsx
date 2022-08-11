import React, { useCallback, useMemo } from 'react'

import { CloseCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { useLocationFacade } from '../../../hooks/useLocationFacade'
import { isEmpty } from '../../../utils/lodash'
import { useNewsState, useUserState } from '../../../utils/redux'
import Button from '../../antd/Button'

const ResetNewsFeedButton = ({ block }) => {
  const { t } = useTranslation()
  const { loadInfiniteNewsFromStart } = useInfiniteNews()

  const onClickResetFeed = useCallback(() => {
    loadInfiniteNewsFromStart({})
  }, [loadInfiniteNewsFromStart])

  const { defaultQuery = {} } = useNewsState()
  const { searchAsObject = {} } = useLocationFacade()
  const { userCompany: { complianceAuthorities } } = useUserState()
  /**
   * Caches a list of keys of the non-default search parameters found.
   * I.e. If only default queries like profile settings or a pagination param
   * are found in the location search query then the value of nonDefaultFilters
   * will be []. If however a text query of published date range was queries,
   * those parameters keys will be returned e.g. ['published', 'query'].
   * */
  const nonDefaultFilterKeys = useMemo(
    () => {
      const defaultQueryKeys = Object.keys(defaultQuery)
      return Object
        .keys(searchAsObject)
        .reduce((nonDefaultFilterParams, filterKey) => {
          if (defaultQueryKeys
            .find(defaultParamKey => defaultParamKey === filterKey)) {
            return nonDefaultFilterParams
          }

          return [
            ...nonDefaultFilterParams,
            searchAsObject[filterKey]
          ]
        }, [])
        .filter(param => !isEmpty(param))
    },
    [defaultQuery, searchAsObject]
  )

  if (isEmpty(nonDefaultFilterKeys) &&
    (Array.isArray(searchAsObject.sources) &&
    complianceAuthorities.length === searchAsObject.sources.length)) {
    return null
  }

  return (
    <Button
      block={block}
      size='middle'
      type='default'
      onClick={onClickResetFeed}
    >
      <CloseCircleOutlined/>
      {t('Reset filters')}
    </Button>
  )
}

export default ResetNewsFeedButton
