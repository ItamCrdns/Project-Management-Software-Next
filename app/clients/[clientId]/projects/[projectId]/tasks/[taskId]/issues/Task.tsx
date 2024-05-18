import TaskUI from '@/components/UI/TaskUI/TaskUI'
import { getTask } from '../(taskId layout)/getTask'

const Task: React.FC<{ projectId: string; taskId: string }> = async (props) => {
  const { data: task, status } = await getTask(props.projectId, props.taskId)

  return <TaskUI task={task} noTask={status !== 200} />
}

export default Task
