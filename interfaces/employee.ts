import { type EmployeeTier } from './EmployeeTier'
import { type Company } from './company'

export interface Employee {
  employeeId: number
  username: string
  role: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  gender: string
  created: string
  profilePicture: string
  lastLogin: string
  companyId: number
  tierId: number
  lockedEnabled: boolean
  loginAttempts: number
  lockedUntil: string
  supervisorId: number
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
  username: 'Dummy name',
  role: '',
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  gender: '',
  created: '',
  profilePicture: '',
  lastLogin: '',
  companyId: 0,
  tierId: 0,
  lockedEnabled: false,
  loginAttempts: 0,
  lockedUntil: '',
  supervisorId: 0,
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
