import { useState, useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaGoogle } from 'react-icons/fa6'

import { InputGroup } from '../components/InputGroup'
import { InputField } from '../components/InputField'
import { BtnGroup } from '../components/BtnGroup'

import { setCredentials } from '../../slices/userSlice'
import
{
  useRegisterMutation
} from '../../slices/userApiEndpoints'

import '../css/RegisterScreen.css'

const RegisterScreen = () =>
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
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  //Register User and Set Info to state
  //initiate useRegisterMutation
  const [ register ] = useRegisterMutation()
  //Handle Form Submit 
  const submitFormHandler = async (e) =>
  {
    e.preventDefault()

    if (password !== confirmPassword)
    {
      toast.error('Passwords Do Not Match')
    } else
    {
      try
      {
        const res = await register({ firstName, lastName, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))

        toast.success('You Have Registered Successfully')
      } catch (err)
      {
        toast.error(err?.data?.message || err.error)
        console.log(err)
      }
    }
  }

  return (
    <div className='RegisterScreen'>
      <Form onSubmit={ submitFormHandler }>
        <div className="header">
          <h1 className='large fw-700 dark'>Register</h1>
        </div>
        <div className="body">
          <InputGroup
            inputs={ [
              {
                type: 'text',
                placeholder: 'First Name',
                value: firstName,
                onChangeHandler: (e) => setFirstName(e.target.value)
              },
              {
                type: 'text',
                placeholder: 'Last Name',
                value: lastName,
                onChangeHandler: (e) => setLastName(e.target.value)
              }
            ] }
          />

          <InputField
            inputs={ [
              {
                type: 'email',
                placeholder: 'Email',
                value: email,
                onChangeHandler: (e) => setEmail(e.target.value)
              },
              {
                type: 'password',
                placeholder: 'Password',
                value: password,
                onChangeHandler: (e) => setPassword(e.target.value)
              },
              {
                type: 'password',
                placeholder: 'Confirm Password',
                value: confirmPassword,
                onChangeHandler: (e) => setConfirmPassword(e.target.value)
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
                text: 'Register'
              }
            ] }
          />
        </div>
        <div className="footer">
          <h1>Already Have An Account? <Link to='/login'>Login</Link></h1>
        </div>
        <a className='btn btn-accent btn-solid medium' style={ { display: 'flex', justifyContent: 'space-between', paddingInline: '1.5rem' } } href='http://localhost:5173/api/users/google'><FaGoogle size={ 30 } />Sign In With Google</a>
      </Form>
    </div>
  )
}

export { RegisterScreen }