import EntityRenderer, {
  type Entity
} from '@/components/Generic Entity Renderer/EntityRenderer'
import { type EachIssueProps } from '@/interfaces/props/EachIssueProps'

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
      width='200px'
      maxWidth='200px'
    />
  )
}

export default EachIssue
