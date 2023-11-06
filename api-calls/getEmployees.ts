import { type Employee } from '@/interfaces/employee'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface GetClientEmployeesReturn {
  employees: SWRGetterReturn<Employee> | undefined
  isLoading: boolean
  isError: unknown
}

const useEmployeesGetter = (endpoint: string): GetClientEmployeesReturn => {
  const { data, error, isLoading } = useSWR<SWRGetterReturn<Employee>>(
    endpoint,
    fetcher
  )

  return {
    employees: data,
    isLoading,
    isError: error
  }
}

export default useEmployeesGetter
