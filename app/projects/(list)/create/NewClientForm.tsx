import RippleButton from '@/components/ripplebutton/RippleButton'
import { useRef } from 'react'
import { type NewClientFormProps } from '@/interfaces/props/NewClientFormProps'

const NewClientForm: React.FC<NewClientFormProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCloseForm = (): void => {
    props.closeForm()
  }

  const handleClick = (): void => {
    const inputValue = inputRef.current?.value ?? ''
    props.sendClientName(inputValue)
  }

  return (
    <section className='flex items-center'>
      <input
        ref={inputRef}
        type='text'
        placeholder='Client name'
        autoComplete='off'
        defaultValue={props.defaultInputValue}
        name='clientName'
        maxLength={255}
        className='w-48'
      />
      <RippleButton
        text={props.buttonText}
        backgroundColor='var(--blue)'
        textColor='white'
        func={handleClick}
      />
      <svg
        onClick={handleCloseForm}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 hover:text-azure-radiance-700 cursor-pointer'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18 18 6M6 6l12 12'
        />
      </svg>
    </section>
  )
}

export default NewClientForm