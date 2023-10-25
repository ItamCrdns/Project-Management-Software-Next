import { type EmployeeTier } from './EmployeeTier'
import { type Company } from './company'

export interface Employee {
  employeeId: number
  username: string
  role: string
  profilePicture: string
  supervisor: Employee | null
  company: Company | null
  projectTotalCount: number
  projectsParticipant: number
  projectsCreated: number
  taskTotalCount: number
  tasksParticipant: number
  tasksCreated: number
  issueTotalCount: number
  issuesParticipant: number
  issuesCreated: number
  tier: EmployeeTier
}
