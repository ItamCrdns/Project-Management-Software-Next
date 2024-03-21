import TaskUI from '@/components/UI/TaskUI/TaskUI'
import { getTask } from './getTask'

const TaskId: React.FC<{ params: { projectId: string, taskId: string } }> = async (
  props
) => {
  const { data: task } = await getTask(props.params.taskId)

  return (
    <section className='flex items-center flex-col'>
      <div className='flex flex-col items-start justify-center gap-8 p-8'>
        {task !== undefined && (
          <TaskUI task={task} />
        )}
      </div>
    </section>
  )
}

export default TaskId
