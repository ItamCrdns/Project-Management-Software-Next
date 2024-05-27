import { type Task } from '@/interfaces/task'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface TaskUIProps {
  task: Data<Task> | null
  employeeCountHref?: string
  noTask: boolean // ? Pass true when task is not found. Ex when status is not 200
}
