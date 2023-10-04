import { type Company } from './company'

export interface Employee {
  employeeId: number
  username: string
  role: string
  profilePicture: string
  supervisor: Employee
  company: Company | null
}
