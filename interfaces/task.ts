import { type Employee } from './employee'
import { type Images } from './images'
import { type Project } from './project'

export interface Task {
  taskId: number
  name: string
  description: string
  created: string // its a date!
  finished: string // its a date too!
  expectedDeliveryDate: string // its a date too!
  startedWorking: string
  taskCreatorId: number
  taskCreator: Employee
  projectId: number
  project: Project
  images: Images
  employees: Employee[]
  employeeCount: number
  clientId: number
}
