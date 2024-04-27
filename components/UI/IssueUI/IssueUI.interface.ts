import { type Issue } from '@/interfaces/Issue'
import { type Data } from '@/utility/api/DataParticipantOwner.interface'

export interface IssueUIProps {
  issue: Data<Issue> | null
  showGeneralInfo?: boolean
  noIssue: boolean // ? Pass true when issue is not found. Ex when status is not 200
}
