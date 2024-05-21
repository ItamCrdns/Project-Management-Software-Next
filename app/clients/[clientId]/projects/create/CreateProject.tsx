'use client'
import { useWarnings } from '@/hooks/useWarnings'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useSubmitRef } from '@/utility/formSubmitRef'
import React, { useRef, useState } from 'react'
import AddDescription from './AddDescription'
import { TextInput } from '@tremor/react'
import { debounce } from '@/utility/debouce'
import { ExpectedDeliveryDateSelector } from './ExpectedDeliveryDateSelector'
import { StartedWorkingSwitch } from './StartedWorkingSwitch'
import { Button } from '@/components/Button/Button'

const CreateProjectModal: React.FC<{
  clientId: number
  clientName: string
}> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setName, setCompany } = useNewProjectActions()

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

    if (newProject.name !== '' && newProject.expectedDeliveryDate !== '') {
      setCompany(props.clientId, props.clientName)
      setReadyForNextPage(true)
    }
  }

  const handleClick = useSubmitRef(formRef)

  const nameWarning: boolean =
    newProject.name === '' && warnings.some((w) => w.field === 'name')

  const expectedDeliveryDateWarning: boolean =
    newProject.expectedDeliveryDate === '' &&
    warnings.some((w) => w.field === 'expectedDeliveryDate')

  return (
    <section className='flex flex-col items-center justify-center'>
      <section className='p-8 rounded-md shadow-md flex items-center justify-center flex-col w-500 bg-theming-white100 dark:bg-theming-dark300'>
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
              <ExpectedDeliveryDateSelector
                defaultValue={new Date(newProject.expectedDeliveryDate)}
                error={expectedDeliveryDateWarning}
                errorMessage='Expected delivery date is required'
              />
              <StartedWorkingSwitch />
            </form>
            <Button
              text='Continue to description'
              borderOnly={
                newProject.name === '' || newProject.expectedDeliveryDate === ''
              }
              txtColor={
                newProject.name === '' || newProject.expectedDeliveryDate === ''
                  ? 'text-gray-400'
                  : 'text-white'
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

export default CreateProjectModal
