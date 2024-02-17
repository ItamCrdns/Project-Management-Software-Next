'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import EmployeesRender from './EmployeesRender'
import useGetEmployees from '@/utility/employees/useGetEmployees'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'

const AddEmployeesToProject: React.FC<{ goBack: () => void }> = (props) => {
  const { setEmployee } = useNewProjectActions()

  const [showResume, setShowResume] = useState<boolean>(false)

  const handleEmployeeClick = (employee: Employee): void => {
    setEmployee(employee)
  }

  const [searchValue, setSearchValue] = useState<string>('')

  const getInputValue = (input: string): void => {
    setSearchValue(input)
  }

  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString())
  }

  const employeesProps = {
    endpoint:
      searchValue === ''
        ? `${process.env.NEXT_PUBLIC_API_URL}Employee/all?page=${currentPage}&pageSize=5`
        : `${process.env.NEXT_PUBLIC_API_URL}Employee/all/search/${searchValue}?page=${currentPage}&pageSize=5`
  }

  const { employeeList, totalPages, message } = useGetEmployees(
    employeesProps.endpoint
  )

  // * Reset the page to 1 when the user searches for something
  const resetPage = searchValue !== ''

  return (
    <EmployeesRender
      showResume={showResume}
      handleReturnHere={() => {
        setShowResume(false)
      }}
      getInputValue={getInputValue}
      employeeList={employeeList}
      message={message}
      handleEmployeeClick={handleEmployeeClick}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      resetPage={resetPage}
      handleSubmit={() => {
        setShowResume(true)
      }}
      handleGoBack={() => {
        props.goBack()
      }}
    />
  )
}

export default AddEmployeesToProject
