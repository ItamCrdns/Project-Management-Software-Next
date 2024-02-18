import { useState } from 'react'
import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import NewClientForm from './NewClientForm'
import { type CreateNewClientProps } from '@/interfaces/props/CreateNewClientProps'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'

const CreateNewClient: React.FC<CreateNewClientProps> = (props) => {
  const { setClientName } = useNewProjectActions()
  const [toggle, setToggle] = useState<boolean>(false)

  const handleCloseForm = (): void => {
    props.newClientOpen(false)
    setToggle(false)
  }

  const handleOpenForm = (): void => {
    props.newClientOpen(true)
    setToggle(true)
  }

  const getClientName = (newName: string): void => {
    setClientName(newName)
    setToggle(false)
  }

  const buttonText = props.clientName === '' ? 'Add client' : 'Update'

  return (
    <>
      <div className={styles.orbar}>
        <span />
        <p>Or</p>
        <span />
      </div>
      {!toggle && props.clientName === '' && (
        <RippleButton
          text='Create new client instead'
          backgroundColor='var(--blue)'
          textColor='white'
          func={handleOpenForm}
          disabled={props.companySelected}
        />
      )}
      {toggle && (
        <NewClientForm
          closeForm={handleCloseForm}
          sendClientName={getClientName}
          defaultInputValue={props.clientName}
          buttonText={buttonText}
        />
      )}
      {props.clientName !== '' && !toggle && (
        <div className={styles.newclientinfo}>
          <input type='text' value={props.clientName} disabled />
          <span
            onClick={() => {
              setToggle(true)
            }}
            className='material-symbols-outlined'
          >
            edit
          </span>
        </div>

      )}
    </>
  )
}

export default CreateNewClient
