import TasksParallel from './page'

interface TasksProps {
  params: { projectId: string }
}

// ? Workaround to get this children if we for some reason open that children from the url directly.
// * Example we access directly from 'url/projects/[id]/employees' or 'url/projects/[id]/tasks'

const DefaultTasks: React.FC<TasksProps> = (props) => {
  return <TasksParallel params={props.params} />
}

export default DefaultTasks
