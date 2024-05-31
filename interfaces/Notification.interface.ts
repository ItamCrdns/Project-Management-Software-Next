import { Employee } from './employee'

export interface Notification {
  notificationId: number
  name: string
  content: string
  created: Date
  senderId?: number
  receiverId: number
  sender?: Employee
  receiver: Employee
}
