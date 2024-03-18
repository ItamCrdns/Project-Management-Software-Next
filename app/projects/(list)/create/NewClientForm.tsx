import { useRef } from 'react'
import { type NewClientFormProps } from '@/interfaces/props/NewClientFormProps'
import { TextInput } from '@tremor/react'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { Trash } from '@/svg/Trash'
import { Close } from '@/svg/Close'
import { CheckMark } from '@/svg/CheckMark'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'

const NewClientForm: React.FC<NewClientFormProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { clientName } = props

  const { setAlert } = useAlertActions()
  const { setClientName, clearCompanyValues } = useNewProjectActions()

  const handleTrash = (): void => {
    if (inputRef.current !== null) {
      inputRef.current.value = ''
    }

    setClientName('')
    props.closeForm()

    setAlert({
      message: 'A new client will not be created',
      type: 'success'
    })
  }

  const handleClick = (): void => {
    if (inputRef.current !== null) {
      const inputValue = inputRef.current?.value

      if (inputValue !== '') {
        clearCompanyValues() // Clear selected company when a new one its created
        setClientName(inputValue)
        props.closeForm()
        setAlert({
          message: `The client will be created upon project submission ${inputValue}`,
          type: 'success'
        })
      }
    }
  }

  return (
    <section className='flex items-center gap-4'>
      <TextInput
        ref={inputRef}
        type='text'
        placeholder='Client name'
        autoComplete='off'
        defaultValue={clientName}
        name='clientName'
        maxLength={255}
      />
      <div
        onClick={handleClick}
        className='cursor-pointer hover:text-green-400'
      >
        <CheckMark />
      </div>
      <div
        onClick={() => {
          props.closeForm()
        }}
        className='cursor-pointer hover:text-red-700'
      >
        <Close />
      </div>
      {clientName !== '' && (
        <div
          onClick={handleTrash}
          className='cursor-pointer hover:text-red-700'
        >
          <Trash />
        </div>
      )}
    </section>
  )
}

export { NewClientForm }
