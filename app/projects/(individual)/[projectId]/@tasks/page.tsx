import { type Task } from '@/interfaces/task'
import styles from '../project.module.css' // Using employee styles to avoid repetition
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'

interface TasksProps {
  params: { projectId: string }
}

const TasksParallel = async ({ params }: TasksProps): Promise<JSX.Element> => {
  const projectId = params.projectId
  const { data } = await getProjectTasks(projectId, '1', '5')
  const tasks = data as Task[]

  return (
    <section className={styles.employees}>
      <div className={styles.headerwrapper}>
        <h1>Task</h1>
        <h3>List</h3>
      </div>
      {Array.isArray(tasks) && (
        <ul>
          {tasks.length > 0 &&
            tasks.map((task: Task, index: number) => (
              <li key={index}>
                <EachTask task={task} />
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}

export default TasksParallel
