import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../css/InputField.css'

const InputField = ({ inputs }) =>
{
  //UseState and handleState func() for password field to show password 
  const [ viewPassword, setViewPassword ] = useState(false)

  return (
    <div className='InputField'>

      {
        inputs.map((input, index) => (
          input.type === 'password' ?
            <div key={ index } className="input-container">
              <input
                key={ index }
                type={ !viewPassword ? input.type : 'text' }
                placeholder={ input.placeholder }
                name={ input.value }
                value={ input.value }
                onChange={ input.onChangeHandler }
                required
              />

              {
                !viewPassword ?
                  <FaEye size={ 20 } onClick={ () => setViewPassword(!viewPassword) } />
                  :
                  <FaEyeSlash size={ 20 } onClick={ () => setViewPassword(!viewPassword) } />
              }

            </div>

            :

            <input
              key={ index }
              type={ input.type }
              placeholder={ input.placeholder }
              name={ input.value }
              value={ input.value }
              onChange={ input.onChangeHandler }
              required
            />
        ))
      }

    </div>
  )
}

export { InputField }