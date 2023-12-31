import
{
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import { HomeScreen } from '../elements/screens/HomeScreen'

import { App } from '../App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <HomeScreen /> } />
    </Route>
  )
)

export { router }