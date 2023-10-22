'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import { type NewProjectData } from '@/interfaces/NewProjectData'
// import fetchEmployees from './fetchEmployees'
import useGetEmployees, {
  type EmployeeFetchProps,
  type UseGetEmployeesProps
} from '@/utility/employees/useGetEmployees'
import EmployeesRender from './EmployeesRender'

interface AddEmployeesProps {
  data: NewProjectData
  goBack: (employees: Employee[]) => void
}

const AddEmployeesToProject = ({
  data,
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

  const companyId = data.data.companyId ?? 0

  const [searchValue, setSearchValue] = useState<string>('')

  const getInputValue = (input: string): void => {
    setSearchValue(input)
  }

  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  const employeesProps: UseGetEmployeesProps = {
    entityId: companyId.toString(),
    searchValue,
    page: currentPage
  }

  const { employeeList, totalPages, message } = useGetEmployees(employeesProps)

  // * Reset the page to 1 when the user searches for something
  const resetPage = searchValue !== ''

  return (
    <EmployeesRender
      showResume={showResume}
      newData={newData}
      selectedEmployees={selectedEmployees}
      handleReturnHere={handleReturnHere}
      data={data}
      getInputValue={getInputValue}
      employeeList={employeeList}
      message={message}
      handleEmployeeClick={handleEmployeeClick}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      resetPage={resetPage}
      handleSubmit={handleSubmit}
      handleGoBack={handleGoBack}
    />
  )
}

export default AddEmployeesToProject
