import { type Employee } from './employee'
import { type Task } from './task'

export interface Issue {
  issueId: number
  name: string
  description: string
  created: string // Date
  startedWorking: string // Date
  fixed: string // Date
  issueCreatorId: string
  issueCreator: Employee
  taskId: number
  task: Task
  employees: Employee[]
}
