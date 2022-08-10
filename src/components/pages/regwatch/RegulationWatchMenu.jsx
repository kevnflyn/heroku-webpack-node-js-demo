import React, { useCallback, useEffect } from 'react'

import Flex from 'styled-flex-component'

import useInfiniteNews from '../../../hooks/useInfiniteNews'
import { setActiveRegulationWatch } from '../../../store/regulationWatch/effects'
import { useRegulationWatchState } from '../../../utils/redux'
import Menu from '../../antd/Menu'
import Truncate from '../../typography/Truncate'
import DeleteRegulationWatch from './DeleteRegulationWatch'
import RegulationWatchActiveSwitch from './RegulationWatchActiveSwitch'

const RegulationWatchMenu = ({ mode = 'horizontal' }) => {
  const { activeRegulationWatch, regulationWatches } = useRegulationWatchState()
  const { loadInfiniteNewsFromStart } = useInfiniteNews()

  const onSelect = useCallback(({ key }) => {
    /**
     * The onSelect handler takes care of selecting saved watches
     * and the default profile setting query.
     *
     * If the watch selected is already activated, the active watch will be
     * deactivated.
     *
     * If menu item selected has key 'defaultSearch', no regulation watch
     * will be found and therefore the active watch will be set to null
     * */

    if (activeRegulationWatch &&
      `${activeRegulationWatch.regulationWatchId}` === key) {
      setActiveRegulationWatch(null)
    } else {
      const found = regulationWatches.find(regulationWatch => (
        `${regulationWatch.regulationWatchId}` === key
      ))

      setActiveRegulationWatch(found)

      loadInfiniteNewsFromStart(found.filter)
    }
  }, [
    activeRegulationWatch,
    loadInfiniteNewsFromStart,
    regulationWatches
  ])

  return (
    <Menu
      onSelect={onSelect}
      selectedKeys={[activeRegulationWatch &&
        activeRegulationWatch.regulationWatchId]}
      style={{ fontSize: '14px' }}
      mode={mode}
    >
      {regulationWatches.map(regulationWatch => {
        const { regulationWatchId, name } = regulationWatch
        return (
        <Menu.Item key={regulationWatchId}>
          <Flex justifyBetween alignEnd style={{ lineHeight: '36px' }}>
            <Truncate title={name} width={180}>
              <b>{name}</b>
            </Truncate>
            <div>
              <RegulationWatchActiveSwitch regulationWatch={regulationWatch}/>
              <DeleteRegulationWatch
                regulationWatchId={regulationWatchId}
                onDelete={loadInfiniteNewsFromStart}
              />
            </div>
          </Flex>
        </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default RegulationWatchMenu
