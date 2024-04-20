import { type Project } from '@/interfaces/project'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface ProjectUIProps {
  project: Data<Project> | null
  showButtons: boolean
  employeeCountHref?: string
  showGeneralInfo?: boolean
  noProject: boolean
}
