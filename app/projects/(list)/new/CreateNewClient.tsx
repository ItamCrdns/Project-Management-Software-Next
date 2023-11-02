import { useState } from 'react'
import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import NewClientForm from './NewClientForm'

interface Props {
  sendClientName: (clientName: string) => void
  newClientOpen: (status: boolean) => void
  companySelected: boolean
}

const CreateNewClient: React.FC<Props> = (props) => {
  const [toggle, setToggle] = useState<boolean>(false)

  const handleCloseForm = (): void => {
    props.newClientOpen(false)
    setToggle(false)
  }

  const handleOpenForm = (): void => {
    props.newClientOpen(true)
    setToggle(true)
  }

  const [clientName, setClientName] = useState<string>('')

  const getClientName = (clientNameFromForm: string): void => {
    setClientName(clientNameFromForm)
    props.sendClientName(clientNameFromForm) // ! Do not send state as props, send the value from the form instead or it wont work
    setToggle(false)
  }

  return (
    <>
      <div className={styles.orbar}>
        <span />
        <p>Or</p>
        <span />
      </div>
      {!toggle && clientName === '' && (
        <RippleButton
          text="Create new client instead"
          width="175px"
          backgroundColor="#80B3FF"
          textColor="white"
          func={handleOpenForm}
          disabled={props.companySelected}
        />
      )}
      {toggle && (
        <NewClientForm
          closeForm={handleCloseForm}
          sendClientName={getClientName}
          defaultInputValue={clientName}
        />
      )}
      {clientName !== '' && !toggle && (
        <div className={styles.newclientinfo}>
          <input type="text" value={clientName} disabled />
          <span
            onClick={() => {
              setToggle(true)
            }}
            className="material-symbols-outlined"
          >
            edit
          </span>
        </div>
      )}
    </>
  )
}

export default CreateNewClient
