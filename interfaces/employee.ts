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

export const employeeInitialState: Employee = {
  employeeId: 0,
  username: '',
  role: '',
  profilePicture: '',
  supervisor: null,
  company: null,
  projectTotalCount: 0,
  projectsParticipant: 0,
  projectsCreated: 0,
  taskTotalCount: 0,
  tasksParticipant: 0,
  tasksCreated: 0,
  issueTotalCount: 0,
  issuesParticipant: 0,
  issuesCreated: 0,
  tier: {
    tierId: 0,
    name: '',
    duty: '',
    created: ''
  }
}
