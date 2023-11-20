import getProjectTasks from '@/api-calls/getProjectTasks'
import styles from '@/app/projects/(list)/projectslist.module.css'
import { type Task } from '@/interfaces/task'
import EachTask from '../(projectId)/@tasks/EachTask'

interface TasksUIProps {
  projectId: string
}

const TasksUI: React.FC<TasksUIProps> = async (props) => {
  const { data } = await getProjectTasks(props.projectId, '1', '10')

  const tasks = data?.entity.data

  return (
    <section className={styles.projectswrapper}>
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
  )
}

export default TasksUI
