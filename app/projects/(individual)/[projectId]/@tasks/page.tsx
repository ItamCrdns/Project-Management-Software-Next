import { type Task } from '@/interfaces/task'
import styles from '@/app/projects/(list)/projectslist.module.css'
import taskstyles from './tasks.module.css'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import RippleButton from '@/components/ripplebutton/RippleButton'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'

interface TasksProps {
  params: { projectId: string }
}

const TasksParallel = async ({ params }: TasksProps): Promise<JSX.Element> => {
  const projectId = params.projectId
  const { data } = await getProjectTasks(projectId, '1', '5')
  const tasks = data?.data

  return (
    <section className={taskstyles.tasks}>
      <section className={styles.projectswrapper}>
        <div className={styles.companywrapper}>
          <h1>Tasks</h1>
          <div>
            <RippleButton
              text="All tasks..."
              backgroundColor="#80B3FF"
              textColor="white"
            />
          </div>
        </div>
        <HeaderDescriptor isTask dashboard={false} width='300px' />
        {Array.isArray(tasks) && (
          <ul>
            {tasks.length > 0 &&
              tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <EachTask task={task} showProjectName={false} />
                </li>
              ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default TasksParallel
