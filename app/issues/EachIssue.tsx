import EntityRenderer, {
  type Entity
} from '@/components/Generic Entity Renderer/EntityRenderer'
import { type Issue } from '@/interfaces/Issue'

interface EachIssueProps {
  issue: Issue
  showTaskName: boolean
}
const EachIssue: React.FC<EachIssueProps> = (props) => {
  const issue = props.issue

  const issueAsEntity: Entity = {
    name: issue.name,
    parentName: issue.task.name,
    id: issue.issueId,
    creator: issue.issueCreator,
    employees: issue.employees ?? [],
    created: issue.created
  }
  return (
    <EntityRenderer
      entity={issueAsEntity}
      showParentEntity={props.showTaskName}
      entityBasePath='issues'
      parentBasePath='tasks'
    />
  )
}

export default EachIssue
