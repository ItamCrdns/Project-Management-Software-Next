import { NotFound } from '@/components/404 Not Found/NotFound'
import { getTask } from './getTask'
import TaskUI from '@/components/UI/TaskUI/TaskUI'
import { Project } from './Banners/Project'
import { Description } from '../../../(projectId)/Banners/Description'
import { Attachments } from '../../../(projectId)/Banners/Attachments'

const Task: React.FC<{ projectId: string, taskId: string }> = async (props) => {
  const { projectId, taskId } = props

  const { data: task, status } = await getTask(projectId, taskId)

  if (status !== 200) {
    return (
      <NotFound
        text='Task not found'
        buttonText='Return to homepage'
        href='/'
      />
    )
  }

  return (
    <>
      <TaskUI task={task} showGeneralInfo={true} noTask={status !== 200} />
      <div className='space-y-8 w-[300px]'>
        <Project project={task?.entity.project} />
        <Description description={task?.entity.description} />
      </div>
      <div className='space-y-8 w-[300px]'>
        <Attachments />
      </div>
    </>
  )
}

export default Task
