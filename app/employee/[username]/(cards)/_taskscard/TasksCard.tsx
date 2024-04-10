import getUserTasksShowcase from '@/api-calls/getUserTasksShowcase'
import { type Task } from '@/interfaces/task'
import { Task as TaskIcon } from '@/svg/Task'
import Link from 'next/link'

const TasksCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props
  const { data } = await getUserTasksShowcase(username, '1', '6')

  const tasks = data?.data
  const tasksCount = data?.count

  return (
    <section className='flex items-center flex-col text-sm gap-4 shadow-md p-4 rounded-lg bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4 justify-center'>
        <TaskIcon />
        <h1 className='text-2xl m-0'>Tasks</h1>
      </div>
      {Array.isArray(tasks) && tasks.length > 0
        ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4'>
            {tasks?.map((task: Task) => (
              <li key={task.taskId} className='p-2 bg-theming-white200 dark:bg-theming-dark200 rounded-md text-center'>
                <p style={{ margin: 0 }}>
                  <Link href={`/tasks/${task.taskId}`} className='px-4'>
                    {task.name.slice(0, 24)}...
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <h3>
            <Link className='font-semibold text-theming-dark100 dark:text-theming-white100' href={`/employee/${username}/tasks?page=1`}>
              See all {tasksCount} tasks
            </Link>
          </h3>
        </>
          )
        : (
        <p>This employee has no assigned tasks</p>
          )}
    </section>
  )
}

export default TasksCard
