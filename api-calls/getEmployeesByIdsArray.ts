import { type Employee } from '@/interfaces/employee'
import { fetcher2 } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface GetEmployeesByIdsArrayReturn {
  employeesFromIds: Employee[] | []
  pictures: string[]
  isLoading: boolean
  isError: unknown
}

export const getEmployeesByIdsArray = (
  employeeIDsArray: number[],
  shouldFetch: boolean
): GetEmployeesByIdsArrayReturn => {
  // * Ensure that every element in the array is a valid number before joining them with hyphens.
  const isValidArray = employeeIDsArray.every((id) => !isNaN(id))
  const arrayString = isValidArray ? employeeIDsArray.join('-') : ''

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}Employee/employees/by-employee-ids?employeeIds=${arrayString}`

  const { data, error, isLoading } = useSWR<Employee[]>(
    shouldFetch ? endpoint : null,
    fetcher2
  )

  return {
    employeesFromIds: data ?? [],
    pictures: data?.map((employee) => employee.profilePicture) ?? [],
    isLoading,
    isError: error
  }
}
