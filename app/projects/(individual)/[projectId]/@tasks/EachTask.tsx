import { type Task } from '@/interfaces/task'

interface EachTaskProps {
  task: Task
}

const EachTask: React.FunctionComponent<EachTaskProps> = ({ task }) => {
  return <p>{task.name}</p>
}

export default EachTask
