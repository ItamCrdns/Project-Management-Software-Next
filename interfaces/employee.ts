import { type EmployeeTier } from './EmployeeTier'
import { type Company } from './company'

export interface Employee {
  employeeId: number
  username: string
  role: string
  profilePicture: string
  supervisor: Employee | null
  company: Company | null
  projectCount: number
  taskCount: number
  issueCount: number
  tier: EmployeeTier
}
