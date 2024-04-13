import EntityRenderer, {
  type Entity
} from '@/components/Generic Entity Renderer/EntityRenderer'
import { type EachIssueProps } from '@/interfaces/props/EachIssueProps'

const EachIssue: React.FC<EachIssueProps> = (props) => {
  const { issue, width } = props

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
      entityBasePath={`projects/${issue.task.projectId}/tasks/${issue.task.taskId}/issues`}
      parentBasePath='tasks'
      width={width ?? '300px'}
      maxWidth={width ?? '300px'}
    />
  )
}

export default EachIssue
