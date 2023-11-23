// ? Will return a list of unique employees that have created projects in a certain client
// ? The client will be specified by the client id
// * Example: employees #1 and #25 have created projects for client #2, so we will only return those two employees regardless of how many projects they have created for that client

import { type Employee } from '@/interfaces/employee'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface Return {
  employees: Employee[] | undefined
  isLoading: boolean
  isError: unknown
}

const getEmployeesThatHaveCreatedProjects = (
  clientId: number,
  shouldFetch: boolean
): Return => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}Employee/${clientId}/projects/created`

  const { data, error, isLoading } = useSWR<Partial<SWRGetterReturn<Employee>>>(
    shouldFetch ? apiUrl : null, // ? Conditionally fetch date based on shouldFetch. ShouldFetch its a toggle state that will become true when a piece of dom is rendered
    fetcher
  )

  return {
    employees: data as Employee[],
    isLoading,
    isError: error
  }
}

export default getEmployeesThatHaveCreatedProjects
