'use client'
import { useRef, useState } from 'react'
import styles from './newProject.module.css'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useSubmitRef } from '@/utility/formSubmitRef'
import AddDescription from './AddDescription'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { useRouter } from 'next/navigation'
import UnsavedChanges from './UnsavedChanges'
import ExpectedDeliveryDateSelector from './ExpectedDeliveryDateSelector'
import CreateNewClient from './CreateNewClient'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import ClientSelection from './_Client Select/ClientSelection'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import { useAppSelector } from '@/lib/hooks/hooks'

const NewProjectModal: React.FC = () => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setCompany, setName } = useNewProjectActions()

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setReadyForNextPage(true)
  }

  const handleClick = useSubmitRef(formRef)

  const clientProvided =
    newProject.clientName !== '' || newProject.companyId !== 0

  const dependency =
    newProject.name !== '' &&
    newProject.expectedDeliveryDate !== '' &&
    clientProvided &&
    readyForNextPage

  const handleCompanySelect = (company: Option | Option[]): void => {
    if (!Array.isArray(company)) {
      setCompany(company.value, company.label)
    }
  }

  const handleInputSubmit = (name: string): void => {
    setName(name)
  }

  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false)

  const router = useRouter()

  const handleExitNewProjectCreation = (): void => {
    if (newProject.name !== '' || newProject.companyId !== 0) {
      setShowUnsavedChanges(true)
    } else {
      router.push('/projects/')
      setShowUnsavedChanges(false)
    }
  }

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const checkIfNewClientFormIsOpen = (isOpen: boolean): void => {
    setIsFormOpen(isOpen)
  }

  const companySelected = newProject.companyId !== 0

  return (
    <section className={styles.newprojectwrapper}>
      {showUnsavedChanges && (
        <UnsavedChanges
          goBack={() => {
            setShowUnsavedChanges(false)
          }}
        />
      )}
      <section className={styles.newproject}>
        <span
          onClick={handleExitNewProjectCreation}
          className={`material-symbols-outlined ${styles.closebutton}`}
        >
          close
        </span>
        {dependency
          ? (
          <AddDescription
            goBack={() => {
              setReadyForNextPage(false)
            }}
          />
            )
          : (
          <>
            <h1>Create a new project</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
              <p
                style={{ width: '400px', marginTop: '0', textAlign: 'center' }}
              >
                Enter a clear project name. It&apos;ll appear to your team
                members and should indicate what the project is focused on.
              </p>
              <InputAndCharacterCount
                defaultValue={newProject.name ?? ''}
                name='name'
                placeholder='Project name'
                limit={255}
                onSubmit={handleInputSubmit}
              />
              <ClientSelection
                clientName={newProject.companyName as string}
                handleClientSelection={handleCompanySelect}
                isFormOpen={isFormOpen}
              />
              <CreateNewClient
                newClientOpen={checkIfNewClientFormIsOpen}
                companySelected={companySelected}
                clientName={newProject.clientName as string}
              />
              <ExpectedDeliveryDateSelector
                defaultValue={new Date(newProject.expectedDeliveryDate)}
              />
            </form>
            <RippleButton
              text='Next'
              backgroundColor='var(--blue)'
              textColor='white'
              func={handleClick}
            />
          </>
            )}
      </section>
    </section>
  )
}

export default NewProjectModal
