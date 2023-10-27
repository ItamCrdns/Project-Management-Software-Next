import { type Employee } from './employee'
import { type Images } from './images'
import { type Project } from './project'

export interface Task {
  taskId: number
  name: string
  description: string
  created: string // its a date!
  startedWorking: string // its a date too!
  finished: string // its a date too!
  taskCreatorId: number
  taskCreator: Employee
  projectId: number
  project: Project
  images: Images
  employees: Employee[] | null
}
