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
import DialogComponent from './Dialog'
import { errorMessageInitialState, type ErrorMessages } from './errorMessages'

const NewProjectModal: React.FC = () => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setCompany, setName } = useNewProjectActions()

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<ErrorMessages>(
    errorMessageInitialState
  )

  const openUnsavedChanges = (val: boolean): void => {
    setShowUnsavedChanges(val)
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const newMessages = { ...messages }

    if (newProject.name === '') {
      newMessages.projectName = 'Project name'
    } else {
      newMessages.projectName = ''
    }

    if (!clientProvided) {
      newMessages.clientName = 'Client'
    } else {
      newMessages.clientName = ''
    }

    if (newProject.expectedDeliveryDate === '') {
      newMessages.expectedDeliveryDate = 'Expected delivery date'
    } else {
      newMessages.expectedDeliveryDate = ''
    }

    setMessages(newMessages)

    if (Object.values(newMessages).some((message) => message !== '')) {
      setIsDialogOpen(true)
    }

    if (
      newProject.name !== '' &&
      newProject.expectedDeliveryDate !== '' &&
      clientProvided
    ) {
      setMessages(errorMessageInitialState)
      setReadyForNextPage(true)
    }
  }

  const handleClick = useSubmitRef(formRef)

  const clientProvided =
    newProject.clientName !== '' || newProject.companyId !== 0

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

  return (
    <section className={styles.newprojectwrapper}>
      <DialogComponent
        isOpen={isDialogOpen}
        setIsOpen={(val) => {
          setIsDialogOpen(val)
        }}
        messages={messages}
      />
      <UnsavedChanges
        isOpen={showUnsavedChanges}
        setIsOpen={openUnsavedChanges}
      />
      <section className={styles.newproject}>
        <svg
          onClick={handleExitNewProjectCreation}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 absolute top-0 right-0 m-2 hover:text-azure-radiance-400 cursor-pointer'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18 18 6M6 6l12 12'
          />
        </svg>
        {readyForNextPage
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
              <p className='w-96 mt-0 text-center'>
                Enter a clear project name. It&apos;ll appear to your team
                members and should indicate what the project is focused on.
              </p>
              <InputAndCharacterCount
                defaultValue={newProject.name}
                defaultCharacterCount={newProject.name.length}
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
                companySelected={newProject.companyId !== 0}
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
