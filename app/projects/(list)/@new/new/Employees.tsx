'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import Button from '@/components/button/button'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import Resume from './Resume'

interface AddEmployeesProps {
  data: NewProjectData
  employees: Employee[] | null
}

const AddEmployeesToProject = ({
  data,
  employees
}: AddEmployeesProps): JSX.Element => {
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[] | null>(
    []
  )
  const [newData, setNewData] = useState<NewProjectData>(data)

  const [showResume, setShowResume] = useState<boolean>(false)

  const handleEmployeeClick = (employee: Employee): void => {
    setSelectedEmployees((prevState) => {
      // Check if the employee is already in the selectedEmployees array
      if (prevState !== null && prevState.includes(employee)) {
        // If it's already selected, remove it
        return prevState.filter((id) => id !== employee)
      } else {
        // If it's not selected, add it to the array
        return [...(prevState ?? []), employee]
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

  const handleSubmit = (): void => {
    setShowResume(true)
  }

  return (
    <>
      {showResume
        ? (
        <Resume project={newData} employees={selectedEmployees} />
          )
        : (
        <>
          <h1>Who will be working on {data.data.name}?</h1>
          <ul>
            {Array.isArray(employees) &&
              employees.map((employee: Employee) => (
                <li
                  key={employee.username}
                  onClick={() => {
                    handleEmployeeClick(employee)
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
                    {selectedEmployees !== null &&
                    selectedEmployees.includes(employee)
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </span>
                </li>
              ))}
          </ul>
          {selectedEmployees !== null && selectedEmployees.length > 0
            ? (
            <div onClick={handleSubmit}>
              <Button
                text="Continue"
                width="100px"
                backgroundColor="#80B3FF"
                textColor='white'
              />
            </div>
              )
            : (
            <div onClick={handleSubmit}>
              <Button
                text="Continue without adding employees"
                width="275px"
                backgroundColor="var(--darker-banner-color)"
                effectColor="var(--banner-color)"
              />
            </div>
              )}
        </>
          )}
    </>
  )
}

export default AddEmployeesToProject
