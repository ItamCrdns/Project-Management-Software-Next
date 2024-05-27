import { type Project } from '@/interfaces/project'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface ProjectUIProps {
  project: Data<Project> | null
  clientId: string
  showButtons: boolean
  employeeCountHref?: string
  noProject: boolean
}
