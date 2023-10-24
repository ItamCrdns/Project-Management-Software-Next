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
  projectParticipantCount: number
  projectCreatorCount: number
  taskTotalCount: number
  taskParticipantCount: number
  taskCreatorCount: number
  issueTotalCount: number
  issueParticipantCount: number
  issueCreatorCount: number
  tier: EmployeeTier
}
