import { type Project } from '@/interfaces/project'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface CreateProps {
  project: Data<Project> | null
}
