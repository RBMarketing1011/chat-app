import { BtnGroup } from '../components/BtnGroup'

import '../css/NotFound.css'

const NotFound = () =>
{
  return (
    <div className='NotFound'>
      <div className="header">
        <h1 className="x-large accent fw-700">404 <span className='x-large primary fw-300'>Page Not Found</span></h1>
      </div>
      <div className="body">
        <p className="medium light text-center">Oops, you seem to be lost.</p>
        <p className="medium light text-center">This page doesn't exist</p>
      </div>
      <div className="footer">
        <h2 className="medium primary fw-700" style={ { marginBottom: '2rem' } }>Here Are Some Helpful Links</h2>
        <BtnGroup
          flexDirection='column'
          btns={ [
            {
              text: 'Home',
              link: '/',
              color: 'btn-accent',
              style: 'btn-outline',
              size: 'medium'
            },
          ] }
        />
      </div>
    </div>
  )
}

export { NotFound }