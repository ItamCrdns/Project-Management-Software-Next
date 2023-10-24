import { type Employee } from './employee'

export interface Issue {
  issueId: number
  name: string
  description: string
  created: string // Date
  startedWorking: string // Date
  fixed: string // Date
  issueCreator: string
  taskId: number
  employees: Employee[]
}
