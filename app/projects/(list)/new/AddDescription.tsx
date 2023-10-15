import { type NewProjectData } from '@/interfaces/NewProjectData'
import AddEmployeesToProject from './_employees/Employees'
import { type Employee } from '@/interfaces/employee'
import { useRef, useState } from 'react'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useSubmitRef } from '@/utility/formSubmitRef'
import CustomSelect, { type Option } from '@/components/select/select'
import { priorityOptions } from './priorityOptions'
import { InputAndCharacterCount } from '@/components/charactercount/CharacterCount'
import styles from './newProject.module.css'

interface AddDescriptionProps {
  data: NewProjectData
  goBack: (
    descriptionValue: string,
    priorityValue: number | null,
    priorityLabel: string | null,
    employeesValue: Employee[] | null
  ) => void
}

const AddDescription = ({ data, goBack }: AddDescriptionProps): JSX.Element => {
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

  const dependency =
    descriptionProvided !== '' && priorityProvided !== 0 && readyForNextPage

  const handleGoBack = (): void => {
    // * Send back the description and priority values to the previous page (as arguments)
    goBack(
      newData.data.description,
      newData.data.priority,
      newData.data.priorityLabel,
      newData.data.employees // * Send back the employees array as well because i was losing them if i returned all the way to 1st page
    )
  }

  const handleReturnHere = (employees: Employee[]): void => {
    setReadyForNextPage(false)

    setNewData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        employees
      }
    }))
  }

  return (
    <>
      {dependency
        ? (
        <AddEmployeesToProject
          data={newData}
          goBack={handleReturnHere}
        />
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
              defaultValue={newData.data.description ?? ''}
              name="description"
              placeholder={`Add a description for ${data.data.name}`}
              limit={255}
              onSubmit={handleTextAreaSubmit}
            />
            <CustomSelect
              defaultValue={newData.data.priorityLabel ?? ''}
              options={priorityOptions}
              text="priority"
              onSelect={handlePrioritySelect}
            />
          </form>
          <div className={styles.buttonwrapper}>
            <div onClick={handleClick}>
              <RippleButton
                text="Next"
                backgroundColor="#80B3FF"
                textColor="white"
                effectColor="var(--banner-color)"
              />
            </div>
            <div onClick={handleGoBack}>
              <RippleButton
                text="Go back"
                backgroundColor="var(--darker-banner-color)"
                effectColor="var(--banner-color)"
                textColor="var(--text-color)"
              />
            </div>
          </div>
        </>
          )}
    </>
  )
}

export default AddDescription
