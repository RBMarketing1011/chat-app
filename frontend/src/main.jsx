import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { router } from './routes/router'
import store from './store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
