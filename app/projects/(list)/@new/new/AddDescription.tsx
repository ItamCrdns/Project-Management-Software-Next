import { type NewProjectData } from '@/interfaces/NewProjectData'
import AddEmployeesToProject from './Employees'
import useGetEmployees from './useGetEmployees'
import { type Employee } from '@/interfaces/employee'
import { useRef, useState } from 'react'
import Button from '@/components/button/button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import CustomSelect, { type Option } from '@/components/select/select'
import { priorityOptions } from './priorityOptions'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'

interface AddDescriptionProps {
  data: NewProjectData
}

const AddDescription = ({ data }: AddDescriptionProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const [newData, setNewData] = useState<NewProjectData>(data)
  const [readyForNextPage, setReadyForNextPage] = useState<boolean>(false)

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setReadyForNextPage(true)
  }

  const handleClick = useSubmitRef(formRef)

  /**
   * Updates the priority value in the state with the selected value. passing this function as props refer to the CustomSelect component
   * @param selectedValue - The selected priority value.
   * @returns void
   */
  const handlePrioritySelect = (selectedValue: Option): void => {
    setNewData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        priority: selectedValue.value,
        priorityLabel: selectedValue.label
      }
    }))
  }

  /**
   * Callback function passed as props that updates the state with the new description value.
   * @param {string} description - The new description value.
   * @returns {void}
   */
  const handleTextAreaSubmit = (description: string): void => {
    setNewData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        description
      }
    }))
  }

  const descriptionProvided = newData.data.description
  const priorityProvided = newData.data.priority

  const dependency = descriptionProvided !== '' && priorityProvided !== 0 && readyForNextPage

  // * Explicitly specify the type of the employees variable to ensure TypeScript recognizes it correctly
  const employees: Employee[] | null = useGetEmployees({ dependency })

  return (
    <>
      {dependency
        ? (
        <AddEmployeesToProject employees={employees} data={newData} />
          )
        : (
        <>
          <h1>Now, add a description:</h1>
          <form ref={formRef} onSubmit={handleSubmit}>
            <p style={{ width: '400px', marginTop: '10px' }}>
              Add a project description with objectives, goals, or key details
              to help your team understand its purpose and importance.
            </p>
            <InputAndCharacterCount
              name="description"
              placeholder={`Add a description for ${data.data.name}`}
              limit={255}
              onSubmit={handleTextAreaSubmit}
            />
            <CustomSelect
              options={priorityOptions}
              text="priority"
              onSelect={handlePrioritySelect}
            />
          </form>
          <div onClick={handleClick}>
            <Button
              text="Next"
              backgroundColor="#80B3FF"
              textColor='white'
              effectColor="var(--banner-color)"
            />
          </div>
        </>
          )}
    </>
  )
}

export default AddDescription
