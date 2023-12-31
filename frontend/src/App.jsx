import { Outlet } from 'react-router-dom'
import { Header } from './elements/upperComponents/Header'
import { Footer } from './elements/upperComponents/Footer'

import './App.css'

const App = () =>
{
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export { App }
