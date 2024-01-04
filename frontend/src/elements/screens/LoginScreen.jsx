import { useState, useEffect } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { InputField } from '../components/InputField'
import { BtnGroup } from '../components/BtnGroup'
import { Link } from 'react-router-dom'

import { setCredentials } from '../../slices/userSlice'
import { useLoginMutation } from '../../slices/userApiEndpoints'

import '../css/LoginScreen.css'

const LoginScreen = () =>
{
  // Import user state from state.user 
  const { user } = useSelector(state => state.auth)

  //initiate useNavigate and useDispatch 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redirect if user logged in already 
  useEffect(() =>
  {
    if (user)
    {
      navigate('/')
    }
  }, [ navigate, user ])

  // Input useState & onChange Func()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const emailHandler = (e) =>
  {
    setEmail(e.target.value)
  }

  const passwordHandler = (e) =>
  {
    setPassword(e.target.value)
  }

  //Register User and Set Info to state
  //initiate useRegisterMutation
  const [ userLogin ] = useLoginMutation()
  //Handle Form Submit 
  const submitFormHandler = async (e) =>
  {
    e.preventDefault()

    console.log(email)
    console.log(password)

    try
    {
      const res = await userLogin({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))

      console.log(res)

      toast.success('You Have Logged In Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }
  }

  return (
    <div className='LoginScreen'>
      <Form onSubmit={ (e) => submitFormHandler(e) }>
        <div className="header">
          <h1 className='large fw-700 dark'>Login</h1>
        </div>
        <div className="body">

          <InputField
            inputs={ [
              {
                type: 'email',
                placeholder: 'Email',
                value: email,
                onChangeHandler: (e) => emailHandler(e)
              },
              {
                type: 'password',
                placeholder: 'Password',
                value: password,
                onChangeHandler: (e) => passwordHandler(e)
              }
            ] }
          />

          <BtnGroup
            width='50%'
            btns={ [
              {
                type: 'submit',
                size: 'medium',
                color: 'btn-primary',
                style: 'btn-solid',
                text: 'Login'
              }
            ] }
          />
        </div>
        <div className="footer">
          <h1>Don't Have An Account? <Link to='/register'>Register</Link></h1>
        </div>
      </Form>
    </div>
  )
}

export { LoginScreen }