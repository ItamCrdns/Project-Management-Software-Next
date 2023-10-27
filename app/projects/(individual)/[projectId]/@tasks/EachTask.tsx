import { type Task } from '@/interfaces/task'
import EntityRenderer, {
  type Entity
} from '@/components/Generic Entity Renderer/EntityRenderer'

interface EachTaskProps {
  task: Task
  showProjectName: boolean
}

const EachTask: React.FunctionComponent<EachTaskProps> = ({
  task,
  showProjectName
}) => {
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
      entityBasePath="tasks"
      parentBasePath="projects"
    />
  )
}

export default EachTask
