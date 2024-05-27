import getUserTasksShowcase from '@/api-calls/getUserTasksShowcase'
import Link from 'next/link'

const TasksCard: React.FC<{ username: string }> = async (props) => {
  const { username } = props
  const { data } = await getUserTasksShowcase(username, '1', '6')

  const tasks = data?.data
  const tasksCount = data?.count

  return (
    <section className='flex items-center flex-col gap-4 shadow-md p-8 rounded-md bg-theming-white100 dark:bg-theming-dark300'>
      <h2 className='font-semibold self-start'>Tasks</h2>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <>
          <ul className='px-4 grid grid-cols-2 gap-4'>
            {tasks?.map((task) => (
              <li
                key={task.taskId}
                className='p-2 bg-theming-white200 dark:bg-theming-dark200 rounded-md text-center'
              >
                <p style={{ margin: 0 }}>
                  <Link className='text-sm px-4' href={`/tasks/${task.taskId}`}>
                    {task.name.slice(0, 24)}...
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <h3>
            <Link
              className='font-semibold text-sm'
              href={`/employee/${username}/tasks?page=1`}
            >
              See all {tasksCount} tasks
            </Link>
          </h3>
        </>
      ) : (
        <p>This employee has no assigned tasks</p>
      )}
    </section>
  )
}

export default TasksCard
