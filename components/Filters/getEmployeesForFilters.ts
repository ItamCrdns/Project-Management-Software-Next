import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type Employee } from '@/interfaces/employee'
import { fetcher2 } from '@/utility/fetcherSWR'
import useSWR from 'swr'

interface SelectedAndAll {
  selectedEmployees: Employee[]
  allEmployees: DataCountPages<Employee>
}

interface Return {
  selectedEmployees: Employee[]
  allEmployees: DataCountPages<Employee>
  error: unknown
  isLoading: boolean
}

export interface EmployeeFetcherProps {
  ids?: string[]
  shouldFetch: boolean
  clientId: number
  page: string
  limit: string
}

export const getEmployeesForFilters = (props: EmployeeFetcherProps): Return => {
  const queryParams = new URLSearchParams({ employeeIds: props.ids?.join('-') ?? '', page: props.page, pageSize: props.limit }).toString()
  const apiUrlForEmployeeProjects = `${process.env.NEXT_PUBLIC_API_URL}Employee/${props.clientId}/projects/created?${queryParams}`

  const { data: employees, error, isLoading } = useSWR<SelectedAndAll>(props.shouldFetch ? apiUrlForEmployeeProjects : null, fetcher2)

  return {
    selectedEmployees: employees?.selectedEmployees ?? [],
    allEmployees: employees?.allEmployees ?? { data: [], count: 0, pages: 0 },
    error,
    isLoading
  }
}
