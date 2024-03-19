import AddEmployeesToProject from './_employees/Employees'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { PrioritySelect } from './PrioritySelect'
import { type ErrorMessages, errorMessageInitialState } from '@/components/UI/Dialog/errorMessages.interface'
import { DialogBanner } from '@/components/UI/Dialog/DialogBanner'

const AddDescription: React.FC<{ goBack: () => void }> = (props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setDescription } = useNewProjectActions()
  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<ErrorMessages>(
    errorMessageInitialState
  )

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const newMessages = { ...messages }

    if (newProject.description === '') {
      newMessages.description = 'Description'
    } else {
      newMessages.description = ''
    }

    if (newProject.priority === 0) {
      newMessages.priority = 'Priority'
    } else {
      newMessages.priority = ''
    }

    setMessages(newMessages)

    if (Object.values(newMessages).some((message) => message !== '')) {
      setIsDialogOpen(true)
    }

    if (newProject.description !== '' && newProject.priority !== 0) {
      setMessages(errorMessageInitialState)
      setReadyForNextPage(true)
    }
  }

  const handleClick = useSubmitRef(formRef)

  const handleTextAreaSubmit = (description: string): void => {
    setDescription(description)
  }

  return (
    <>
      <DialogBanner
        isOpen={isDialogOpen}
        setIsOpen={(val) => {
          setIsDialogOpen(val)
        }}
        messages={messages}
      />
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
                onSubmit={handleTextAreaSubmit}
              />
            </div>
            <PrioritySelect priority={newProject.priorityLabel} />
          </form>
          <div className='flex gap-4 mt-4'>
            <Button text='Next' func={handleClick} />
            <Button text='Go back' func={props.goBack} />
          </div>
        </>
          )}
    </>
  )
}

export default AddDescription
