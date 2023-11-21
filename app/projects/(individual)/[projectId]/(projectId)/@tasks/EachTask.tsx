import { type Task } from '@/interfaces/task'
import EntityRenderer, {
  type Entity
} from '@/components/Generic Entity Renderer/EntityRenderer'

interface EachTaskProps {
  task: Task
  showProjectName: boolean
  width?: string
}

const EachTask: React.FunctionComponent<EachTaskProps> = (props) => {
  const { task, showProjectName, width } = props

  const taskAsEntity: Entity = {
    name: task.name,
    parentName: task.project.name,
    id: task.taskId,
    creator: task.taskCreator,
    employees: task.employees ?? [],
    created: task.created
  }

  return (
    <EntityRenderer
      entity={taskAsEntity}
      showParentEntity={showProjectName}
      entityBasePath={`projects/${task.project.projectId}/tasks`}
      parentBasePath="projects"
      width={width ?? '300px'}
      maxWidth={width ?? '300px'}
    />
  )
}

export default EachTask
