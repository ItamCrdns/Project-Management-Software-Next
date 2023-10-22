import { useState, useEffect } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'
import getProjectEmployees from '@/api-calls/getProjectEmployees'

export interface EmployeeFetchProps {
  endpoint: string
  currentPage: string
  searchValue: string
}

export interface UseGetEmployeesProps {
  endpoint: string
  page: string
  searchValue: string
}

interface UseGetEmployeesReturn {
  employeeList: Employee[]
  totalPages: number
  message: string
}

/**
 * Custom hook to fetch employees data from the server.
 * @param entityId - The ID of the entity to fetch employees for.
 * @param searchValue - The search query to filter employees by.
 * @param page - The page number to fetch.
 * @returns An object containing the list of employees, total number of pages, and a message.
 */
const useGetEmployees = ({
  endpoint,
  page,
  searchValue
}: UseGetEmployeesProps): UseGetEmployeesReturn => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)
  const [message, setMessage] = useState<string>('Loading...')

  useEffect(() => {
    getProjectEmployees(endpoint, page, '5')
      .then((res) => {
        setEmployees(res.data as DictionaryResponse<Employee>)
      })
      .catch((err) => {
        setMessage(err.toString())
      })
  }, [page, searchValue])

  const totalPages = employees?.pages ?? 0
  const employeeList = employees?.data ?? []

  useEffect(() => {
    if (employeeList.length <= 0) {
      setMessage('No employees match your search criteria.')
    }
  }, [employeeList])

  return { employeeList, totalPages, message }
}

export default useGetEmployees
