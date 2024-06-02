'use client'
import { useState } from 'react'
import { type Employee } from '@/interfaces/employee'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import Search from '@/components/search/search'
import EmployeeList from './EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Buttons from './Buttons'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useGetEmployees } from '@/api-calls/getEmployees'
import Resume from '../Resume'

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

  const endpoint =
    searchValue === ''
      ? `Employee/all?page=${currentPage}&pageSize=5`
      : `Employee/all/search/${searchValue}?page=${currentPage}&pageSize=5`

  const { employees, totalPages, isLoading } = useGetEmployees(
    process.env.NEXT_PUBLIC_API_URL + endpoint
  )

  // * Reset the page to 1 when the user searches for something
  const resetPage = searchValue !== ''

  return (
    <>
      {showResume ? (
        <Resume
          goBack={() => {
            setShowResume(false)
          }}
        />
      ) : (
        <>
          <h1 className='text-center line-clamp-2 text-2xl mb-4'>
            Who will be working on {newProject.name}?
          </h1>
          <div className='w-96'>
            <Search
              maxInputLength={16}
              stateBasedSearch={true}
              stateBasedGetInputValue={getInputValue}
            />
            <EmployeeList
              employeeList={employees}
              selectedEmployees={newProject.employees}
              handleEmployeeClick={handleEmployeeClick}
              isLoading={isLoading}
            />
            <div className='p-6'>
              <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
                reset={resetPage}
              />
            </div>
          </div>
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
