import { type Images } from './images'

export interface Task {
  taskId: number
  name: string
  description: string
  created: string // its a date!
  startedWorking: string // its a date too!
  finished: string // its a date too!
  taskCreatorId: number
  projectId: number
  images: Images
}
