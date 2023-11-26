import { type Employee } from '@/interfaces/employee'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface GetEmployeesByIdsArrayReturn {
  employeesFromIds: Employee[] | []
  isLoading: boolean
  isError: unknown
}

export const getEmployeesByIdsArray = (
  arrayString: string,
  shouldFetch: boolean
): GetEmployeesByIdsArrayReturn => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}Employee/employees/by-employee-ids?employeeIds=${arrayString}`

  const { data, error, isLoading } = useSWR<SWRGetterReturn<Employee>>(
    shouldFetch ? endpoint : null,
    fetcher
  )

  return {
    employeesFromIds: data as unknown as Employee[], // * Too lazy to find a solution for this weird typing issue
    isLoading,
    isError: error
  }
}
