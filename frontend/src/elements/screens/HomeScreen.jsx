import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { BtnGroup } from '../components/BtnGroup'

import { useGetProfileFromJWTMutation } from '../../slices/userApiEndpoints'
import { setCredentials } from '../../slices/userSlice'

import '../css/HomeScreen.css'

const HomeScreen = () =>
{
  const { user } = useSelector(state => state.auth)

  //get user from token if no user found
  const [ isUser, setIsUser ] = useState(false)
  const dispatch = useDispatch()
  const [ getSocialProfile ] = useGetProfileFromJWTMutation()

  const decodeToken = async () =>
  {
    try
    {
      const res = await getSocialProfile().unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (err)
    {
      console.log(err)
    }
  }

  if (user === null)
  {
    if (!isUser)
    {
      decodeToken()
      setIsUser(!isUser)
    }
  }

  //logoutHandler
  const logoutHandler = async () =>
  {

  }

  return (
    <div className='HomeScreen'>

      {
        user ?
          <>
            <h1 className="heading x-large text-center">Welcome Back</h1>
            <h1 className='x-large text-center'>
              <span className='x-large accent'>{ user.firstName }</span>
              <span className='x-large primary fw-300'>{ user.lastName }</span>
            </h1>
            <Link className='btn medium fw-700 btn-accent btn-solid' onClick={ logoutHandler }>Logout</Link>
          </>

          :
          <>
            <h1 className="heading x-large text-center">Welcome to the <span className='accent x-large fw-700'>chat</span><span className='primary x-large fw-300'>app</span></h1>

            <BtnGroup
              width='100%'
              btns={ [
                {
                  text: 'Login',
                  link: '/login',
                  size: 'medium',
                  color: 'btn-primary',
                  style: 'btn-solid'
                },
                {
                  text: 'Register',
                  link: '/register',
                  size: 'medium',
                  color: 'btn-accent',
                  style: 'btn-outline'
                }
              ] }
              flexDirection='row'
            />
          </>
      }

    </div>
  )
}

export { HomeScreen }