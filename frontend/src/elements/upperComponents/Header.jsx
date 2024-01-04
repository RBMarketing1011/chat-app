import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

import { FaBarsStaggered, FaSquareFacebook, FaSquareInstagram, FaSquareEnvelope } from 'react-icons/fa6'

import ReactLogo from '../../assets/react.svg'
import '../css/Header.css'

const Header = () =>
{
  // set up useRef and useState for navigation slide animation
  const navRef = useRef(null)
  const [ navOpen, setNavOpen ] = useState(false)

  // make nav slide in on menu bars onClick
  const navbarSlide = () =>
  {
    if (!navOpen)
    {
      navRef.current.style.left = '0'
    } else
    {
      navRef.current.style.left = '100%'
    }

    setNavOpen(!navOpen)
  }
  return (
    <header className='Header'>
      <Link className="brand" to='/'>
        <img src={ ReactLogo } alt="" className="logo react" />
        <h1 className='heading accent medium'>Chat<span className='primary medium fw-300'>App</span></h1>
      </Link>
      <div className="menu">
        <FaBarsStaggered size={ 30 } onClick={ navbarSlide } />
        <nav className="navbar" ref={ navRef }>
          <ul>
            <li><Link className='x-large' to='/login'>Login</Link></li>
            <li><Link className='x-large' to='/login'>Contacts</Link></li>
            <li><Link className='x-large' to='/login'>Groups</Link></li>
            <li><Link className='x-large' to='/login'>Logout</Link></li>
          </ul>

          <div className="socials">
            <FaSquareEnvelope size={ 40 } />
            <FaSquareFacebook size={ 40 } />
            <FaSquareInstagram size={ 40 } />
          </div>
        </nav>
      </div>
    </header>
  )
}

export { Header }