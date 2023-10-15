'use client'
import { type Employee } from '@/interfaces/employee'
import { useEffect, useState } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import fetchEmployees from './fetchEmployees'
import EmployeesRender from './EmployeesRender'

interface EmployeeProps {
  params: { projectId: string }
}

const EmployeesList = ({ params }: EmployeeProps): JSX.Element => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)

  const [message, setMessage] = useState<string>('Loading...')
  const [currentPage, setCurrentPage] = useState<string>('1')

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString()) // Get the Pagination component page number with a callback function (convert it to string too!)
    if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: page.toString() }) // Promises are already coming fulfilled so we cannot catch the error, its gonna come in the .then instead the .catch
        .then((res) => {
          if (typeof res === 'string') {
            // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          // Still have the catch otherwise eslint gets mad
          setMessage(err)
        })

      // * Above comments also apply to the code below
    }
  }

  const [searchValue, setSearchValue] = useState<string>('')

  const getInputValue = (input: string): void => {
    setSearchValue(input)
  }

  useEffect(() => {
    if (searchValue !== '') {
      fetchEmployees({
        projectId: params.projectId,
        searchValue,
        page: currentPage
      })
        .then((res) => {
          if (typeof res === 'string') {
            // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          setMessage(err)
        })
    } else if (searchValue === '') {
      fetchEmployees({ projectId: params.projectId, page: currentPage })
        .then((res) => {
          if (typeof res === 'string') {
            // If the res its a string that means that the API returned an error
            setMessage(res)
          }
          setEmployees(res as DictionaryResponse<Employee>)
        })
        .catch((err) => {
          setMessage(err)
        })
    }
  }, [searchValue, currentPage])

  const totalPages = employees?.pages ?? 0
  const employeeList = employees?.data ?? []

  useEffect(() => {
    if (employeeList.length <= 0) {
      setMessage('No employees match your search criteria.')
    }
  }, [employeeList])

  return (
    <EmployeesRender
      projectId={params.projectId}
      employeeList={employeeList}
      message={message}
      searchValue={searchValue}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      getInputValue={getInputValue}
    />
  )
}

export default EmployeesList
