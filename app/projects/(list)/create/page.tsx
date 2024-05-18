'use client'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import AddDescription from './AddDescription'
import { useRouter } from 'next/navigation'
import UnsavedChanges from './UnsavedChanges'
import { ExpectedDeliveryDateSelector } from './ExpectedDeliveryDateSelector'
import CreateNewClient from './CreateNewClient'
import { ClientSelection } from './_Client Select/ClientSelection'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { StartedWorkingSwitch } from './StartedWorkingSwitch'
import { ReturnBadge } from '@/components/UI/Return/ReturnBadge'
import { useWarnings } from '@/hooks/useWarnings'
import { TextInput } from '@tremor/react'
import { debounce } from '@/utility/debouce'

const NewProjectModal: React.FC<{
  searchParams: { clientId: string }
}> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setName } = useNewProjectActions()

  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()

  const handleDisabledClick = (): void => {
    if (newProject.name === '') {
      handleSetWarning('Project name is required', 'name')
    } else {
      handleFilterWarning('name')
    }

    if (newProject.clientName === '' && newProject.companyId === 0) {
      handleSetWarning('Client is required', 'parentName')
    } else {
      handleFilterWarning('parentName')
    }

    if (newProject.expectedDeliveryDate === '') {
      handleSetWarning(
        'Expected delivery date is required',
        'expectedDeliveryDate'
      )
    } else {
      handleFilterWarning('expectedDeliveryDate')
    }
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    if (
      newProject.name !== '' &&
      newProject.expectedDeliveryDate !== '' &&
      clientProvided
    ) {
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

  const nameWarning: boolean =
    newProject.name === '' && warnings.some((w) => w.field === 'name')

  const expectedDeliveryDateWarning: boolean =
    newProject.expectedDeliveryDate === '' &&
    warnings.some((w) => w.field === 'expectedDeliveryDate')

  const clientWarning: boolean =
    newProject.clientName === '' &&
    newProject.companyId === 0 &&
    warnings.some((w) => w.field === 'parentName')

  return (
    <section className='flex flex-col items-center justify-center p-8'>
      <UnsavedChanges
        isOpen={showUnsavedChanges}
        setIsOpen={(value) => {
          setShowUnsavedChanges(value)
        }}
      />
      <section className='p-8 rounded-md shadow-md flex items-center justify-center flex-col w-500 bg-theming-white100 dark:bg-theming-dark300'>
        <ReturnBadge callback={handleReturn} />
        {readyForNextPage ? (
          <AddDescription
            goBack={() => {
              setReadyForNextPage(false)
            }}
          />
        ) : (
          <>
            <h1 className='text-2xl mb-4'>Create a new project</h1>
            <form ref={formRef} onSubmit={handleSubmit}>
              <p className='w-96 mb-4 text-center'>
                Enter a clear project name. It&apos;ll appear to your team
                members and should indicate what the project is focused on.
              </p>
              <div className='mb-4'>
                <TextInput
                  type='text'
                  placeholder='Project name'
                  defaultValue={newProject.name}
                  onValueChange={debounce((name) => {
                    setName(name)
                  }, 500)}
                  error={nameWarning}
                  errorMessage='Project name is required'
                  maxLength={255}
                />
              </div>
              <ClientSelection
                clientName={newProject.companyName as string}
                disabled={newProject.clientName !== ''}
                searchParams={props.searchParams}
                error={clientWarning}
                errorMessage='Client is required. Select one or create a new one'
              />
              <CreateNewClient
                companySelected={newProject.companyId !== 0}
                clientName={newProject.clientName as string}
              />
              <ExpectedDeliveryDateSelector
                defaultValue={new Date(newProject.expectedDeliveryDate)}
                error={expectedDeliveryDateWarning}
                errorMessage='Expected delivery date is required'
              />
              <StartedWorkingSwitch />
            </form>
            <Button
              text='Next'
              disabled={
                newProject.name === '' ||
                newProject.expectedDeliveryDate === '' ||
                !clientProvided
              }
              func={handleClick}
              disabledFunc={handleDisabledClick}
            />
          </>
        )}
      </section>
    </section>
  )
}

export default NewProjectModal
