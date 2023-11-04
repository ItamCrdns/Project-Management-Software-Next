import { type NewProjectData } from '../NewProjectData'
import { type Employee } from '../employee'

export interface AddEmployeesProps {
  data: NewProjectData
  goBack: (employees: Employee[]) => void
}
