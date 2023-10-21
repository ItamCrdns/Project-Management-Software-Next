import { useState, useEffect } from 'react'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'
import { type Employee } from '@/interfaces/employee'
import { useRouter } from 'next/navigation'

export interface EmployeeFetchProps {
  entityId: string
  searchValue?: string
  page: string
}

export interface UseGetEmployeesProps {
  entityId: string
  searchValue: string
  fetchEmployees: (
    props: EmployeeFetchProps
  ) => Promise<DictionaryResponse<Employee> | string>
  isNewProject?: boolean

}

interface UseGetEmployeesReturn {
  employeeList: Employee[]
  totalPages: number
  handlePageChange: (page: number) => void
  message: string
}

/**
 * Custom hook to fetch employees from the API.
 * Gets three arguements: entity Id, search value, and a function to fetch the employees.
 * @param {Object} props - The props object.
 * @param {string} props.entityId - The entityId to filter the employees by.
 * @param {string} props.searchValue - The searchValue to filter the employees by.
 * @param {Function} props.fetchEmployees - Function to fetch the employees. This gives us the ability to reuse this hook for different endpoints.
 * @returns {Object} - An object containing the employeeList, totalPages, handlePageChange function, and message.
 */
const useGetEmployees = ({
  entityId,
  searchValue,
  fetchEmployees,
  isNewProject
}: UseGetEmployeesProps): UseGetEmployeesReturn => {
  const [employees, setEmployees] =
    useState<DictionaryResponse<Employee> | null>(null)
  const [message, setMessage] = useState<string>('Loading...')
  const [currentPage, setCurrentPage] = useState<string>('1')

  const router = useRouter()

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString()) // Get the Pagination component page number with a callback function (convert it to string too!)
    console.log(currentPage)
    isNewProject === false && router.push(`?page=${page}`)
    if (searchValue === '') {
      fetchEmployees({ entityId, page: page.toString() }) // Promises are already coming fulfilled so we cannot catch the error, its gonna come in the .then instead the .catch
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

  useEffect(() => {
    if (searchValue !== '') {
      fetchEmployees({
        entityId,
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
      fetchEmployees({ entityId, page: currentPage })
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

  return { employeeList, totalPages, handlePageChange, message }
}

export default useGetEmployees
