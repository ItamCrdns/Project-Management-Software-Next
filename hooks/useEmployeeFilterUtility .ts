import { type DataCountPages } from '@/interfaces/DataCountPages.interface'
import { type Employee } from '@/interfaces/employee'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useGetSearchParams } from '../components/Filters/useGetSearchParams'

interface SelectedAndAll {
  selectedEmployees: Employee[]
  allEmployees: DataCountPages<Employee>
}

interface Return {
  selectedEmployees: Employee[]
  allEmployees: DataCountPages<Employee>
  error: unknown
  isLoading: boolean
  onEmployeeSelect: (employee: Employee) => void
  clearSelectedEmployees: () => void
}

export interface EmployeeFetcherProps {
  ids?: string[]
  shouldFetch: boolean
  clientId: number
  page: string
  limit: string
}

const fetcher = async (url: string): Promise<SelectedAndAll> => await fetch(url, { credentials: 'include' }).then(async res => await res.json())

export const useEmployeeFilterUtility = (props: EmployeeFetcherProps): Return => {
  const queryParams = new URLSearchParams({ employeeIds: props.ids?.join('-') ?? '', page: props.page, pageSize: props.limit }).toString()
  const key = props.shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}Employee/${props.clientId}/projects/created?${queryParams}` : null

  const { data, error, isLoading } = useSWR<SelectedAndAll>(key, fetcher)

  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [allEmployees, setAllEmployees] = useState<DataCountPages<Employee>>({ data: [], count: 0, pages: 0 })

  useEffect(() => {
    if (data !== undefined) {
      setSelectedEmployees(data.selectedEmployees)
      setAllEmployees(data.allEmployees)
    }
  }, [data])

  const { router, pathname, searchParams } = useGetSearchParams()

  // New state to handle the selected employees for the URL. This avoids collision when clearing all filters in the PageFilters component.
  const [employeesForUrl, setEmployeesForUrl] = useState<number[]>(searchParams.get('author')?.split('-').map(Number) ?? [])

  useEffect(() => {
    if (employeesForUrl.length === 0) {
      searchParams.delete('author')
    } else {
      searchParams.set('author', employeesForUrl.join('-'))
    }

    router.replace(`${pathname}?${searchParams.toString()}`)
  }, [employeesForUrl])

  const onEmployeeSelect = (employee: Employee): void => {
    const prevAuthors: number[] = searchParams.get('author')?.split('-').map(Number) ?? []

    if (prevAuthors.includes(employee.employeeId)) {
      const newAuthors = prevAuthors.filter((id) => id !== employee.employeeId)

      if (newAuthors.length === 0) {
        setEmployeesForUrl([])
      } else {
        setEmployeesForUrl(newAuthors)
      }
    } else {
      setEmployeesForUrl([...prevAuthors, employee.employeeId])
    }

    setSelectedEmployees((prev) => {
      if (prev.some((e) => e.employeeId === employee.employeeId)) {
        const newSelectedEmployees = prev.filter((e) => e.employeeId !== employee.employeeId)

        return newSelectedEmployees
      }
      return [...prev, employee]
    })
  }

  const clearSelectedEmployees = (): void => {
    setSelectedEmployees([])
  }

  return {
    selectedEmployees,
    allEmployees,
    error,
    isLoading,
    onEmployeeSelect,
    clearSelectedEmployees
  }
}
