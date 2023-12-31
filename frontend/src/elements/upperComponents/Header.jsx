import '../css/Header.css'
import ReactLogo from '../../assets/react.svg'

const Header = () =>
{
  return (
    <div className='Header'>
      <div className="brand">
        <img src={ ReactLogo } alt="" className="logo react" />
      </div>
    </div>
  )
}

export { Header }