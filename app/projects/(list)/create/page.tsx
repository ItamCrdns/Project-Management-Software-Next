'use client'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import AddDescription from './AddDescription'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { useRouter } from 'next/navigation'
import UnsavedChanges from './UnsavedChanges'
import ExpectedDeliveryDateSelector from './ExpectedDeliveryDateSelector'
import CreateNewClient from './CreateNewClient'
import { ClientSelection } from './_Client Select/ClientSelection'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { StartedWorkingSwitch } from './StartedWorkingSwitch'
import { ReturnBadge } from '@/components/UI/Return/ReturnBadge'
import { errorMessageInitialState, type ErrorMessages } from '@/components/UI/Dialog/errorMessages.interface'
import { DialogBanner } from '@/components/UI/Dialog/DialogBanner'

const NewProjectModal: React.FC<{
  searchParams: { clientId: string }
}> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setName } = useNewProjectActions()

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<ErrorMessages>(
    errorMessageInitialState
  )

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const newMessages = { ...messages }

    if (newProject.name === '') {
      newMessages.name = 'Project name'
    } else {
      newMessages.name = ''
    }

    if (!clientProvided) {
      newMessages.parentName = 'Client'
    } else {
      newMessages.parentName = ''
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

  const [showUnsavedChanges, setShowUnsavedChanges] = useState<boolean>(false)

  const router = useRouter()

  const handleReturn = (): void => {
    if (newProject.name !== '' || newProject.companyId !== 0) {
      setShowUnsavedChanges(true)
    } else {
      router.push('/projects/')
      setShowUnsavedChanges(false)
    }
  }

  return (
    <section className='fixed w-full h-screen flex flex-col items-center justify-center z-45 m-0 p-0'>
      <DialogBanner
        isOpen={isDialogOpen}
        setIsOpen={(val) => {
          setIsDialogOpen(val)
        }}
        messages={messages}
      />
      <UnsavedChanges
        isOpen={showUnsavedChanges}
        setIsOpen={(value) => {
          setShowUnsavedChanges(value)
        }}
      />
      <section className='absolute top-8 p-8 rounded-lg flex items-center justify-center flex-col w-500 bg-theming-white100 dark:bg-theming-dark300'>
        <ReturnBadge callback={handleReturn} />
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
            <h1 className='text-2xl mb-4'>Create a new project</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
              <p className='w-96 mb-4 text-center'>
                Enter a clear project name. It&apos;ll appear to your team
                members and should indicate what the project is focused on.
              </p>
              <div className='mb-4'>
                <InputAndCharacterCount
                  defaultValue={newProject.name}
                  defaultCharacterCount={newProject.name.length}
                  name='name'
                  placeholder='Project name'
                  limit={255}
                  onSubmit={(name) => {
                    setName(name)
                  }}
                />
              </div>
              <ClientSelection
                clientName={newProject.companyName as string}
                disabled={newProject.clientName !== ''}
                searchParams={props.searchParams}
              />
              <CreateNewClient
                companySelected={newProject.companyId !== 0}
                clientName={newProject.clientName as string}
              />
              <ExpectedDeliveryDateSelector
                defaultValue={new Date(newProject.expectedDeliveryDate)}
              />
              <StartedWorkingSwitch />
            </form>
            <Button text='Next' func={handleClick} />
          </>
            )}
      </section>
    </section>
  )
}

export default NewProjectModal
