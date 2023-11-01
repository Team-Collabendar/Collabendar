import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import './globals.css'




ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
