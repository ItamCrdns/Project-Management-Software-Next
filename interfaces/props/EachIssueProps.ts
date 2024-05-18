import { type Issue } from '../Issue'

export interface EachIssueProps {
  issue: Issue
  showTaskName: boolean
  width?: string
  entityBasePath: string
}
