import { type Employee } from '@/interfaces/employee'
import useEmployeesGetter from '@/api-calls/getEmployees'

interface UseGetEmployeesReturn {
  employeeList: Employee[]
  totalPages: number
  message: string
}

const useGetEmployees = (endpoint: string): UseGetEmployeesReturn => {
  const { employees, isLoading } = useEmployeesGetter(endpoint)

  const employeeList = employees?.data ?? []

  let message = ''
  if (employeeList.length <= 0 && !isLoading) {
    message = 'No employees match your search criteria.'
  }
  const totalPages = employees?.pages ?? 0

  return { employeeList, totalPages, message }
}

export default useGetEmployees
