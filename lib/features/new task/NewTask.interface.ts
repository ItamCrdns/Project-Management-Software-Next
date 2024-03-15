import { type Employee } from '@/interfaces/employee'

export interface NewTaskData {
  name: string
  description: string
  created: string
  startedWorking: string
  finished: string
  taskCreatorId: number
  projectId: number
  employees: Employee[] | null
  expectedDeliveryDate: string
}
