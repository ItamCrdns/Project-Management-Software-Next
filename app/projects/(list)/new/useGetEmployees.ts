import { useState, useEffect } from 'react'
import { type Employee } from '@/interfaces/employee'
import getPaginatedEmployees from '@/api-calls/getPaginatedEmployees'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

interface GetEmployeesHookProps {
  companyId: number | null
  page: string
  pageSize: string
  dependency: boolean
}

/**
 * Custom hook to fetch paginated employees for a given company.
 * @param {GetEmployeesHookProps} props - The props object containing companyId, page, pageSize, and dependency.
 * @returns {Employee[] | null} - The array of employees or null if not yet fetched.
 */
const useGetEmployees = ({
  companyId,
  page,
  pageSize,
  dependency
}: GetEmployeesHookProps): DictionaryResponse<Employee> | null => {
  const [employees, setEmployees] = useState<DictionaryResponse<Employee> | null>(null)

  const getEmployees = (): void => {
    getPaginatedEmployees(companyId ?? 0, page, pageSize)
      .then((response) => {
        setEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (dependency) {
      getEmployees()
    }
  }, [dependency])

  return employees
}

export default useGetEmployees
