'use client'
import { useEffect, useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import Button from '@/components/button/button'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import handleSubmitProject from './postProject'
import { useRouter } from 'next/navigation'

interface AddEmployeesProps {
  data: NewProjectData
  employees: Employee[] | null
}

const AddEmployeesToProject = ({
  data,
  employees
}: AddEmployeesProps): JSX.Element => {
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const [newData, setNewData] = useState<NewProjectData>(data)

  const handleEmployeeClick = (employeeId: number): void => {
    setSelectedEmployees((prevState) => {
      // Check if the employeeId is already in the selectedEmployees array
      if (prevState.includes(employeeId)) {
        // If it's already selected, remove it
        return prevState.filter((id) => id !== employeeId)
      } else {
        // If it's not selected, add it to the array
        return [...prevState, employeeId]
      }
    })

    setNewData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        employees: selectedEmployees
      }
    }))
  }

  const router = useRouter()

  const handleSubmit = (): void => {
    const formData = new FormData()

    formData.append('name', data.data.name)
    formData.append('description', data.data.description)
    formData.append('companyId', data.data.companyId?.toString() ?? '')

    for (let i = 0; i < selectedEmployees.length; i++) {
      formData.append('employees', selectedEmployees[i].toString())
    }

    handleSubmitProject(formData)
      .then((res) => {
        if (res.status === 200) {
          router.push(`/projects/${res.data}`)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    console.log(newData.data)
  }, [data, newData])

  return (
    <>
      <ul>
        {Array.isArray(employees) &&
          employees.map((employee: Employee) => (
            <li
              key={employee.username}
              onClick={() => {
                handleEmployeeClick(employee.employeeId)
              }}
            >
              <div>
                <Image
                  src={employee.profilePicture}
                  alt={employee.username}
                  width={50}
                  height={50}
                />
                <p>{employee.username}</p>
              </div>
              <span
                style={{ color: '#6499E9' }}
                className="material-symbols-outlined"
              >
                {selectedEmployees.includes(employee.employeeId)
                  ? 'radio_button_checked'
                  : 'radio_button_unchecked'}
              </span>
            </li>
          ))}
      </ul>
      {selectedEmployees.length > 0
        ? (
        <div onClick={handleSubmit}>
          <Button text="Continue" width="100px" effectColor="black" />
        </div>
          )
        : (
        <Button
          text="Continue without adding employees"
          width="275px"
          effectColor="black"
        />
          )}
    </>
  )
}

export default AddEmployeesToProject
