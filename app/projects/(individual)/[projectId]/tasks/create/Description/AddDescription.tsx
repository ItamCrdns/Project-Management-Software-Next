import { Button } from '@/components/Button/Button'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { useNewTaskActions } from '@/lib/hooks/New task actions/useNewTaskActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { type AddDescriptionProps } from './AddDescription.interface'
import { useState } from 'react'
import { Employees } from '../Employees/Employees'
import { useWarnings } from '@/hooks/useWarnings'

const AddDescription: React.FC<AddDescriptionProps> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)
  const { setDescription } = useNewTaskActions()

  const [ready, setReady] = useState<boolean>(false)

  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()

  const handleDisabledClick = (): void => {
    if (newTask.description === '') {
      handleSetWarning('Description is required', 'description')
    } else {
      handleFilterWarning('description')
    }
  }

  const descriptionWarning: boolean =
    newTask.description === '' &&
    warnings.some((w) => w.field === 'description')

  return (
    <>
      {ready
        ? (
        <Employees
          return={() => {
            setReady(false)
          }}
        />
          )
        : (
        <>
          <h1 className='text-2xl'>Enter a task description</h1>
          <p className='w-96 text-center'>
            Add a task description. This will help designated employees
            understand the purpose and importance of the task.
          </p>
          <div className='w-full'>
            <InputAndCharacterCount
              defaultValue={newTask.description}
              defaultCharacterCount={newTask.description.length}
              name='description'
              placeholder='Task description'
              limit={255}
              onSubmit={setDescription}
              error={descriptionWarning}
              errorMessage='Description is required'
            />
          </div>
          <div className='flex gap-4'>
            <Button
              text='Next'
              disabled={newTask.description === ''}
              func={() => {
                setReady(true)
              }}
              disabledFunc={handleDisabledClick}
            />
            <Button text='Return' func={props.return} />
          </div>
        </>
          )}
    </>
  )
}

export { AddDescription }
