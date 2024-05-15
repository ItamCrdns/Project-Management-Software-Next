import { Employee } from '@/interfaces/employee'
import { SearchParams } from '@/interfaces/searchParams'

export interface EmployeesRenderProps {
  employeeList: Employee[]
  totalPages: number
  searchParams: SearchParams
  closeButtonHref: string
  headerText: string
  isLoading: boolean
}
