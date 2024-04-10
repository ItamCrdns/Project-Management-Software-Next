import getUserTasksShowcase from '@/api-calls/getUserTasksShowcase'
import { type Task } from '@/interfaces/task'
import { Task as TaskIcon } from '@/svg/Task'
import Link from 'next/link'

const TasksCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props
  const { data } = await getUserTasksShowcase(username, '1', '5')

  const tasks = data?.data
  const tasksCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md px-8 py-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-between border-b-2 border-azure-radiance-200 pb-4'>
        <TaskIcon />
        <h1 className='text-2xl m-0'>Current tasks</h1>
        <h3 className='m-0'>List</h3>
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

export default TasksCard
