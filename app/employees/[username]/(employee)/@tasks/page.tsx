import { type Task } from '@/interfaces/task'
import styles from '@/app/projects/(individual)/[projectId]/(projectId)/project.module.css'
import getUserTasksShowcase from '@/api-calls/getUserTasksShowcase'
import Link from 'next/link'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const Tasks: React.FunctionComponent<UsernameParamsProps> = async ({
  params
}) => {
  const { username } = params
  const { data } = await getUserTasksShowcase(username, '1', '5')
  const tasks = data?.data
  const tasksCount = data?.count

  return (
    <section className={styles.employees}>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-2'>
        <span className='material-symbols-outlined'>note_stack</span>
        <h1>Current tasks</h1>
        <h3>List</h3>
      </div>
      {Array.isArray(tasks) && tasks.length > 0
        ? (
        <>
          <ul>
            {tasks?.map((task: Task) => (
              <li key={task.taskId}>
                <p style={{ margin: 0 }}>
                  <Link href={`/tasks/${task.taskId}`}>
                    {task.name.slice(0, 24)}...
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={`/employees/${username}/tasks?page=1`}>
              See all {tasksCount} tasks
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
