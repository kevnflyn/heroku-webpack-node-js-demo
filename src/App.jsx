import React from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import useSetupForApp from './hooks/useSetupForApp'
import Routing from './Routing'
import store from './store/store'

import './App.less'

const App = () => {
  const {
    applicationInitialised
  } = useSetupForApp()

  if (applicationInitialised) {
    return <Routing/>
  }

  return null
}

const container = document.getElementById('app')

const root = createRoot(container);

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

if (module.hot) {
  module.hot.accept(['./Routing'], renderApp)
}

renderApp()
