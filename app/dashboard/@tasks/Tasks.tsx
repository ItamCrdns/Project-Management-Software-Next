import getTasksShowcase from '@/api-calls/getTasksShowcase'
import Link from 'next/link'
import styles from '../banner.module.css'
import { type Task } from '@/interfaces/task'

const Tasks = async (): Promise<JSX.Element> => {
  const { data } = await getTasksShowcase('1', '5')
  const tasks = data?.data

  return (
    <article className={styles.banner}>
      <div className={styles.header}>
        <span className="material-symbols-outlined">note_stack</span>
        <h1>Tasks</h1>
      </div>
      {Array.isArray(tasks) && (
        <ul>
          {tasks.map((task: Task) => (
            <li key={task.taskId}>
              <h2>
                <Link href={`/tasks/${task.taskId}`}>{task.name}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default Tasks
