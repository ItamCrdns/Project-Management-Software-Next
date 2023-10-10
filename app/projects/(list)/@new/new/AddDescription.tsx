import { type NewProjectData } from '@/interfaces/NewProjectData'
import AddEmployeesToProject from './Employees'
import useGetEmployees from './useGetEmployees'
import { type Employee } from '@/interfaces/employee'
import { useRef, useState } from 'react'
import Button from '@/components/button/button'
import { useSubmitRef } from '@/utility/formSubmitRef'

interface AddDescriptionProps {
  data: NewProjectData
}
const AddDescription = ({ data }: AddDescriptionProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const [newData, setNewData] = useState<NewProjectData>(data)
  //   const projectName = data.data.name
  //   const companyId = data.data.companyId

  const descriptionProvided = newData.data.description

  const dependency = descriptionProvided !== ''

  // * Explicitly specify the type of the employees variable to ensure TypeScript recognizes it correctly
  const employees: Employee[] | null = useGetEmployees({ dependency })

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    )

    setNewData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        description: formData.description as string
      }
    }))
  }

  const handleClick = useSubmitRef(formRef)

  return (
    <>
      {dependency
        ? (
        <AddEmployeesToProject employees={employees} data={newData} />
          )
        : (
        <>
          <form ref={formRef} onSubmit={handleSubmit}>
            <textarea
              name="description"
              placeholder="Add a project description"
            />
          </form>
          <div onClick={handleClick}>
            <Button text="Next" backgroundColor="blue" />
          </div>
        </>
          )}
    </>
  )
}

export default AddDescription
