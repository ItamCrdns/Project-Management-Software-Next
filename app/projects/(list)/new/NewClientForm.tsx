import styles from './newProject.module.css'
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
    <section className={styles.newclientform}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Client name'
        autoComplete='off'
        defaultValue={props.defaultInputValue}
        name='clientName'
        maxLength={255}
      />
      <RippleButton
        text={props.buttonText}
        backgroundColor='var(--blue)'
        textColor='white'
        func={handleClick}
      />
      <span
        onClick={handleCloseForm}
        className={`material-symbols-outlined ${styles.closebuttonnotabsolute}`}
      >
        close
      </span>
    </section>
  )
}

export default NewClientForm
