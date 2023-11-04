import { type Employee } from '../employee'

export interface EmployeeListProps {
  employeeList: Employee[]
  selectedEmployees: Employee[] | null
  message: string
  handleEmployeeClick: (employee: Employee) => void
}
