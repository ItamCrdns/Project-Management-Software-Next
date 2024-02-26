import { type Employee } from '../employee'

export interface EmployeeListProps {
  employeeList: Employee[]
  selectedEmployees: Employee[] | null
  handleEmployeeClick: (employee: Employee) => void
  isLoading: boolean
}
