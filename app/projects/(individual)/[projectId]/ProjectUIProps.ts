import { type Company } from '@/interfaces/company'
import { type Employee } from '@/interfaces/employee'
import { type Images } from '@/interfaces/images'
import { type Project } from '@/interfaces/project'

export interface ProjectUIProps {
  project?: Project
  company: Company
  images: Images
  projectCreator: Employee
  employees: Employee[]
  projectId: number
  employeeCount: number
  tasksCount: number
  children: React.ReactNode
  tasks: React.ReactNode
  isParticipant: boolean
  isOwner: boolean
}
