import { type Employee } from '@/interfaces/employee'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import { fetcher } from '@/utility/fetcherSWR'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

interface Return {
  employees: Employee[]
  totalPages: number
  isLoading: boolean
  isError: unknown
}

export const useGetEmployees = (endpoint: string): Return => {
  const {
    data: emp,
    error,
    isLoading
  } = useSWR<SWRGetterReturn<Employee>>(endpoint, fetcher)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    if (emp !== undefined) {
      setEmployees(emp.data)
      setTotalPages(emp.pages)
    }
  }, [emp])

  return {
    employees,
    totalPages,
    isLoading,
    isError: error
  }
}
