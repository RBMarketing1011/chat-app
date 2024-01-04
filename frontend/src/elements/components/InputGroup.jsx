import '../css/InputGroup.css'

const InputGroup = ({ inputs }) =>
{
  return (
    <div className='InputGroup'>
      {
        inputs.map((input, index) => (
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

export { InputGroup }