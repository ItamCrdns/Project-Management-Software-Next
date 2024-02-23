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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'
          />
        </svg>
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
