'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import Image from 'next/image'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type NewProjectData } from '@/interfaces/NewProjectData'
import Resume from './Resume'
import styles from './newProject.module.css'

interface AddEmployeesProps {
  data: NewProjectData
  employees: Employee[] | null
  goBack: (employees: Employee[]) => void
}

const AddEmployeesToProject = ({
  data,
  employees,
  goBack
}: AddEmployeesProps): JSX.Element => {
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[] | null>(
    data.data.employees
  )
  const [newData, setNewData] = useState<NewProjectData>(data)
  const [showResume, setShowResume] = useState<boolean>(false)

  const handleEmployeeClick = (employee: Employee): void => {
    setSelectedEmployees((prevState) => {
      // GitHub Copilot: The active selection is a code snippet written in TypeScript that is part of a React application. The code is responsible for managing a list of selected employees. The setSelectedEmployees function is called with a callback that takes the previous state of the selected employees array as an argument.
      // The code first checks if the previous state is not null and if it contains the employee that is being selected or deselected. If the employee is already in the selectedEmployees array, the code removes it from the array by filtering out the employee with the matching employeeId. If the employee is not in the selectedEmployees array, the code adds it to the array by creating a new array that contains all the previous selected employees (if any) and the new employee.
      // The code uses the nullish coalescing operator (??) to handle the case where the previous state is null. If the previous state is null, the code creates a new empty array to add the new employee to.
      // This code is a good example of how to manage state in a React application using the useState hook. It also demonstrates how to use the Array.some and Array.filter methods to check if an element is in an array and remove it from the array, respectively.
      // Check if the employee is already in the selectedEmployees array
      if (
        prevState !== null &&
        prevState.some((emp) => emp.employeeId === employee.employeeId)
      ) {
        // If it's already selected, remove it
        return prevState.filter((emp) => emp.employeeId !== employee.employeeId)
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

  const handleGoBack = (): void => {
    goBack(selectedEmployees ?? [])
  }

  const handleReturnHere = (): void => {
    setShowResume(false)
  }

  return (
    <>
      {showResume
        ? (
        <Resume project={newData} employees={selectedEmployees} goBack={handleReturnHere} />
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
                    style={{ color: '#6499E9', userSelect: 'none' }}
                    className="material-symbols-outlined"
                  >
                    {selectedEmployees !== null &&
                    selectedEmployees.includes(
                      selectedEmployees.find(
                        (e) => e.username === employee.username
                      ) ?? employee
                    )
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </span>
                </li>
              ))}
          </ul>
          {selectedEmployees !== null && selectedEmployees.length > 0
            ? (
            <div className={styles.buttonwrapper}>
              <div onClick={handleSubmit}>
                <RippleButton
                  text="Continue"
                  width="100px"
                  backgroundColor="#80B3FF"
                  textColor="white"
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
              )
            : (
            <div className={styles.buttonwrapper}>
              <div onClick={handleSubmit}>
                <RippleButton
                  text="Continue without adding employees"
                  width="275px"
                  backgroundColor="var(--darker-banner-color)"
                  effectColor="var(--banner-color)"
                  textColor="var(--text-color)"
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
              )}
        </>
          )}
    </>
  )
}

export default AddEmployeesToProject
