import { type Task } from '@/interfaces/task'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface TaskUIProps {
  task: Data<Task> | null
  employeeCountHref?: string
}
