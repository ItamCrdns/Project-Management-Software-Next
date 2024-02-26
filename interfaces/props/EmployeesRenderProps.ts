import { type Employee } from '../employee'

export interface EmployeesRenderProps {
  showResume: boolean
  handleReturnHere: () => void
  getInputValue: (input: string) => void
  employeeList: Employee[]
  message: string
  handleEmployeeClick: (employee: Employee) => void
  totalPages: number
  handlePageChange: (page: number) => void
  resetPage: boolean
  handleSubmit: () => void
  handleGoBack: () => void
}
