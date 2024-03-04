import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type Employee } from '@/interfaces/employee'
import { useEffect, useState } from 'react'
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

const fetcher = async (url: string): Promise<SelectedAndAll> => await fetch(url, { credentials: 'include' }).then(async res => await res.json())

export const getEmployeesForFilters = (props: EmployeeFetcherProps): Return => {
  const queryParams = new URLSearchParams({ employeeIds: props.ids?.join('-') ?? '', page: props.page, pageSize: props.limit }).toString()
  const key = props.shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}Employee/${props.clientId}/projects/created?${queryParams}` : null

  const { data: employees, error, isLoading } = useSWR<SelectedAndAll>(key, fetcher)

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [allEmployees, setAllEmployees] = useState<DataCountPages<Employee>>({ data: [], count: 0, pages: 0 })

  useEffect(() => {
    if (employees !== undefined) {
      setSelectedEmployees(employees.selectedEmployees)
      setAllEmployees(employees.allEmployees)
    }
  }, [employees])

  return {
    selectedEmployees,
    allEmployees,
    error,
    isLoading
  }
}
