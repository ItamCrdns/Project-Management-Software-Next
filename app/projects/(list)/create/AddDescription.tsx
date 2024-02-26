import AddEmployeesToProject from './_employees/Employees'
import { useRef, useState } from 'react'
import { Button } from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import CustomSelect from '@/components/select/select'
import { priorityOptions } from './priorityOptions'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import DialogComponent from './Dialog'
import { type ErrorMessages, errorMessageInitialState } from './errorMessages'

const AddDescription: React.FC<{ goBack: () => void }> = (props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const newProject = useAppSelector((state) => state.newProjectData)
  const { setPriority, setDescription } = useNewProjectActions()
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

  const handlePrioritySelect = (priority: Option | Option[] | null): void => {
    if (!Array.isArray(priority) && priority !== null) {
      setPriority(priority)
    } else if (priority === null) {
      setPriority({ label: '', value: 0 })
    }
  }

  const handleTextAreaSubmit = (description: string): void => {
    setDescription(description)
  }

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <>
      <DialogComponent
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
            <CustomSelect
              defaultValue={
                newProject.priorityLabel === ''
                  ? 'Pick a priority...'
                  : newProject.priorityLabel ?? ''
              }
              options={priorityOptions}
              showReset={newProject.priorityLabel !== ''}
              onSelect={handlePrioritySelect}
              shouldShowDropdown={toggle}
              onShowDropdown={() => {
                setToggle(!toggle)
              }}
              closeDropdown={() => {
                setToggle(false)
              }}
            />
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
