import { type Task } from '@/interfaces/task'
import styles from '../employee.module.css'
import getUserTasksShowcase from '@/api-calls/getUserTasksShowcase'
import Link from 'next/link'

interface TasksProps {
  params: { username: string }
}

const Tasks: React.FunctionComponent<TasksProps> = async ({ params }) => {
  const { username } = params
  const { data } = await getUserTasksShowcase(username, '1', '5')
  const tasks = data?.data
  const tasksCount = data?.count

  return (
    <section className={styles.taskswrapper}>
      <div className={styles.titlewrapper}>
        <div>
          <span className="material-symbols-outlined">auto_stories</span>
          <h1>Current tasks</h1>
        </div>
      </div>
      {Array.isArray(tasks) && tasks.length > 0
        ? (
        <>
          <ul>
            {tasks?.map((task: Task) => (
              <li key={task.taskId}>
                <h3>
                  <Link href={`/tasks/${task.taskId}`}>{task.name.slice(0, 24)}...</Link>
                </h3>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={`/employees/${username}/tasks?page=1`}>
              See all {tasksCount} {username} tasks
            </Link>
          </h3>
        </>
          )
        : (
        <p>Here we will show their current tasks.</p>
          )}
    </section>
  )
}

export default Tasks
