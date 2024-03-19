import AddEmployeesToProject from './_employees/Employees'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { PrioritySelect } from './PrioritySelect'
import { useWarnings } from '@/hooks/useWarnings'

const AddDescription: React.FC<{ goBack: () => void }> = (props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setDescription } = useNewProjectActions()
  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()

  const handleDisabledClick = (): void => {
    if (newProject.description === '') {
      handleSetWarning('Description is required', 'description')
    } else {
      handleFilterWarning('description')
    }

    if (newProject.priority === 0) {
      handleSetWarning('Priority is required', 'priority')
    } else {
      handleFilterWarning('priority')
    }
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    if (newProject.description !== '' && newProject.priority !== 0) {
      setReadyForNextPage(true)
    }
  }

  const handleClick = useSubmitRef(formRef)

  const descriptionWarning: boolean =
    newProject.description === '' &&
    warnings.some((w) => w.field === 'description')

  const priorityWarning: boolean =
    newProject.priority === 0 && warnings.some((w) => w.field === 'priority')

  return (
    <>
      {readyForNextPage
        ? (
        <AddEmployeesToProject
          goBack={() => {
            setReadyForNextPage(false)
          }}
        />
          )
        : (
        <>
          <h1 className='text-2xl mb-4'>Now, add a description</h1>
          <form ref={formRef} onSubmit={handleSubmit}>
            <p className='w-96 mb-4 text-center'>
              Add a project description with objectives, goals, or key details
              to help your team understand its purpose and importance.
            </p>
            <div className='mb-4'>
              <InputAndCharacterCount
                defaultValue={newProject.description ?? ''}
                defaultCharacterCount={newProject.description.length}
                name='description'
                placeholder={`Add a description for ${newProject.name}`}
                limit={255}
                onSubmit={(description) => {
                  setDescription(description)
                }}
                error={descriptionWarning}
                errorMessage='Description is required'
              />
            </div>
            <PrioritySelect
              priority={newProject.priorityLabel}
              error={priorityWarning}
              errorMessage='Priority is required'
            />
          </form>
          <div className='flex gap-4 mt-4'>
            <Button
              text='Next'
              func={handleClick}
              disabled={
                newProject.description === '' ||
                (newProject.priority === 0 && newProject.priorityLabel === '')
              }
              disabledFunc={handleDisabledClick}
            />
            <Button text='Go back' func={props.goBack} />
          </div>
        </>
          )}
    </>
  )
}

export default AddDescription
