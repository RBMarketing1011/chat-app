import
{
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import { HomeScreen } from '../elements/screens/HomeScreen'
import { RegisterScreen } from '../elements/screens/RegisterScreen'
import { LoginScreen } from '../elements/screens/LoginScreen'

import { NotFound } from '../elements/screens/NotFound'

import { App } from '../App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <HomeScreen /> } />
      <Route path='/register' element={ <RegisterScreen /> } />
      <Route path='/login' element={ <LoginScreen /> } />

      {/* Handle 404 Errors */ }
      <Route path='*' element={ <NotFound /> } />
    </Route>
  )
)

export { router }