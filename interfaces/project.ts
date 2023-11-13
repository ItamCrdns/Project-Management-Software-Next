import { type Company } from './company'
import { type Employee } from './employee'
import { type Images } from './images'

export interface Project {
  projectId: number
  name: string
  description: string
  created: string // its a date!
  finalized: string // its a date too!
  expectedDeliveryDate: string // its a date too!
  projectCreatorId: number
  lifecycle: string
  images: Images
  creator: Employee
  company: Company
  employeeCount: number
  tasksCount: number
  team: Employee[]
  priority: number
}
