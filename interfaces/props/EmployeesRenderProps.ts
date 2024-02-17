// import { type NewProjectData } from '../NewProjectData'
import { type Employee } from '../employee'

export interface EmployeesRenderProps {
  showResume: boolean
  // newData: NewProjectData
  // selectedEmployees: Employee[] | null
  handleReturnHere: () => void
  // data: NewProjectData
  getInputValue: (input: string) => void
  // handleInputChange: (value: boolean) => void
  employeeList: Employee[]
  message: string
  handleEmployeeClick: (employee: Employee) => void
  totalPages: number
  handlePageChange: (page: number) => void
  resetPage: boolean
  handleSubmit: () => void
  handleGoBack: () => void
}
