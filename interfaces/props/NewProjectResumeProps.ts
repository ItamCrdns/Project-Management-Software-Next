import { type NewProjectData } from '../NewProjectData'
import { type Employee } from '../employee'

export interface NewProjectResumeProps {
  project: NewProjectData
  employees: Employee[] | null
  goBack: () => void
}
