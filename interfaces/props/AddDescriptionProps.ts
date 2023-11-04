import { type NewProjectData } from '../NewProjectData'
import { type Employee } from '../employee'

export interface AddDescriptionProps {
  data: NewProjectData
  goBack: (
    descriptionValue: string,
    priorityValue: number | null,
    priorityLabel: string | null,
    employeesValue: Employee[] | null
  ) => void
}
