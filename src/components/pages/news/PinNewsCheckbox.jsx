import React, { useCallback, useEffect, useState } from 'react'

import { requestPinnedArticlesContent, updatePinnedArticles } from '../../../store/pinnedArticles/effects'
import { usePinnedArticlesState } from '../../../utils/redux'
import Checkbox from '../../antd/Checkbox'

const PinNewsCheckbox = ({ articleId }) => {
  const { pinnedArticles: { pinnedArticles } } = usePinnedArticlesState()

  const [checked, setChecked] = useState(false)

  const onChange = useCallback(async ({
    target: { checked: checkedValue }
  }) => {
    setChecked(checkedValue)
    if (checkedValue) {
      await updatePinnedArticles([
        ...pinnedArticles,
        articleId
      ])
      requestPinnedArticlesContent()
    } else {
      updatePinnedArticles(
        pinnedArticles.filter(id => id !== articleId)
      )
    }
  }, [articleId, pinnedArticles])

  useEffect(() => {
    setChecked(
      pinnedArticles.find(pinnedArticleId => pinnedArticleId === articleId)
    )
  }, [articleId, pinnedArticles])

  return <Checkbox onChange={onChange} checked={checked}/>
}

export default PinNewsCheckbox
