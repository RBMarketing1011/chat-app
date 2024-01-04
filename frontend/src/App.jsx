import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from './elements/upperComponents/Header'

import './App.css'

const App = () =>
{
  return (
    <div className="main-container">
      <Header />
      <ToastContainer />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export { App }
