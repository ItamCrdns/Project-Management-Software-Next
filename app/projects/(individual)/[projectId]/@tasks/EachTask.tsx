import { type Task } from '@/interfaces/task'

interface EachTaskProps {
  task: Task
}

const EachTask: React.FunctionComponent<EachTaskProps> = ({ task }) => {
  return task.name
}

export default EachTask
