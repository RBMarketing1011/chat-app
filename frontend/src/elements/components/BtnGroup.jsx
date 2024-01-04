import { Link } from 'react-router-dom'

import '../css/BtnGroup.css'

const BtnGroup = ({ btns, flexDirection, width }) =>
{
  return (
    <div className='BtnGroup' style={ { flexDirection: flexDirection, width: width } }>

      {
        btns.map((btn, index) => (
          btn.type == 'submit' ?
            <button
              key={ index }
              type={ btn.type }
              className={ `btn ${ btn.size } ${ btn.color } ${ btn.style }` }
            >
              { btn.text }
            </button>

            :

            <Link
              key={ index }
              type={ btn.type }
              className={ `btn ${ btn.size } ${ btn.color } ${ btn.style }` }
              to={ btn.link }
            >
              { btn.text }
            </Link>
        ))
      }

    </div>
  )
}

export { BtnGroup }