import { type Data } from '@/api-calls/getProjectLimited'

export interface ProjectUIProps {
  project: Data | null
  showButtons: boolean
  employeeCountHref?: string
}
