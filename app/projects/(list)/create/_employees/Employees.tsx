'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import useGetEmployees from '@/utility/employees/useGetEmployees'
import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import Resume from '../Resume'
import Search from '@/components/search/search'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Buttons from './Buttons'
import { useAppSelector } from '@/lib/hooks/hooks'

const AddEmployeesToProject: React.FC<{ goBack: () => void }> = (props) => {
  const newProject = useAppSelector((state) => state.newProjectData)

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
    <>
      {showResume
        ? (
        <Resume
          goBack={() => {
            setShowResume(false)
          }}
        />
          )
        : (
        <>
          <h1 className='text-center line-clamp-2'>
            Who will be working on {newProject.name}?
          </h1>
          <Search
            maxInputLength={16}
            stateBasedSearch={true}
            stateBasedGetInputValue={getInputValue}
          />
          <EmployeeList
            employeeList={employeeList}
            selectedEmployees={newProject.employees}
            message={message}
            handleEmployeeClick={handleEmployeeClick}
          />
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            reset={resetPage}
          />
          <Buttons
            selectedEmployees={newProject.employees}
            handleSubmit={() => {
              setShowResume(true)
            }}
            handleGoBack={props.goBack}
          />
        </>
          )}
    </>
  )
}

export default AddEmployeesToProject
