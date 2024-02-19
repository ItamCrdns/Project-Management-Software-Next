import { type Employee } from '@/interfaces/employee'
import { fetcher2 } from '@/utility/fetcherSWR'
import useSWR from 'swr'

export const getMyEmployeeSWR = (): Employee | null => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL + 'Employee/me'

  const { data } = useSWR<Employee>(endpoint, fetcher2)

  if (data !== undefined && data !== null) {
    return data
  }

  return null
}
