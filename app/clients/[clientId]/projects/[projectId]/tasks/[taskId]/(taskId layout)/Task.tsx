import { getTask } from './getTask'
import TaskUITeamAndCreator from '@/components/UI/TaskUI/TaskUITeamAndCreator'
import { Project } from './Banners/Project'
import { Description } from '../../../(projectId layout)/Banners/Description'
import { NotFound } from '@/components/404 Not Found/NotFound'
import TaskPictures from './Banners/TaskPictures'

const Task: React.FC<{ clientId: string; projectId: string; taskId: string }> =
  async (props) => {
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
        <TaskUITeamAndCreator task={task} noTask={status !== 200} />
        <div className='space-y-8 w-[300px]'>
          <Project
            name={task?.entity.project.name}
            clientId={props.clientId}
            projectId={props.projectId}
          />
          <Description description={task?.entity.description} />
        </div>
        <div className='space-y-8 w-[300px]'>
          <TaskPictures />
        </div>
      </>
    )
  }

export default Task
