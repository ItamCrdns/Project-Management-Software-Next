import { useGetEmployees } from '@/api-calls/getEmployees'
import Buttons from '@/app/clients/[clientId]/projects/create/_employees/Buttons'
import EmployeeList from '@/app/clients/[clientId]/projects/create/_employees/EmployeeList'
import Pagination from '@/components/pagination/pagination'
import Search from '@/components/search/search'
import { useNewTaskActions } from '@/lib/hooks/New task actions/useNewTaskActions'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useState } from 'react'
import { Resume } from '../Resume/Resume'

const Employees: React.FC<{ return: () => void }> = (props) => {
  const newTask = useAppSelector((state) => state.newTaskData)
  const { setEmployee } = useNewTaskActions()

  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<string>('1')

  const endpoint =
    searchValue === ''
      ? `Project/${newTask.projectId}/employees?page=${currentPage}&pageSize=5`
      : `Project/${newTask.projectId}/employees/search/${searchValue}?page=${currentPage}&pageSize=5`

  const { employees, totalPages, isLoading } = useGetEmployees(
    process.env.NEXT_PUBLIC_API_URL + endpoint
  )

  const [ready, setReady] = useState<boolean>(false)

  return (
    <>
      {ready ? (
        <Resume
          return={() => {
            setReady(false)
          }}
        />
      ) : (
        <>
          <h1 className='text-center line-clamp-2 text-2xl'>
            Assign employees to work on this task.
          </h1>
          <p className='w-96 text-center'>
            Please note that you can only add employees that are already working
            in this project.
          </p>
          <div className='w-96'>
            <Search
              maxInputLength={16}
              stateBasedSearch={true}
              stateBasedGetInputValue={(value) => {
                setSearchValue(value)
              }}
            />
            <EmployeeList
              employeeList={employees}
              selectedEmployees={newTask.employees}
              handleEmployeeClick={(employee) => {
                setEmployee(employee)
              }}
              isLoading={isLoading}
            />
            <div className='pt-6 pb-2'>
              <Pagination
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page.toString())
                }}
                reset={searchValue !== ''}
              />
            </div>
          </div>
          <Buttons
            selectedEmployees={newTask.employees}
            handleSubmit={() => {
              setReady(true)
            }}
            handleGoBack={props.return}
          />
        </>
      )}
    </>
  )
}

export { Employees }
