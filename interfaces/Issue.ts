import { type Employee } from './employee'
import { Project } from './project'
import { type Task } from './task'

export interface Issue {
  issueId: number
  name: string
  description: string
  created: string // its a date!
  finished: string // its a date too!
  expectedDeliveryDate: string // its a date too!
  startedWorking: string
  issueCreatorId: string
  issueCreator: Employee
  taskId: number
  task: Task
  employees: Employee[]
  employeeCount: number
  project: Project
  clientId: number
  projectId: number
}
