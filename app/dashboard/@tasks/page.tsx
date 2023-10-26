import getTasksShowcase from '@/api-calls/getTasksShowcase'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '../dashboard.module.css'
import EachTask from '@/app/projects/(individual)/[projectId]/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import Link from 'next/link'

const Tasks = async (): Promise<JSX.Element> => {
  const { data } = await getTasksShowcase('1', '5')
  const tasks = data?.data ?? []
  const totalTasksCount = data?.count ?? 0

  return (
    <section className={styles.tasks}>
      <h1 style={{ fontSize: '32px', fontWeight: 600 }}>All tasks</h1>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        {Array.isArray(tasks) && (
          <>
            <ul>
              {tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <EachTask task={task} />
                </li>
              ))}
            </ul>
            <h3 style={{ fontWeight: 500, marginBottom: 0 }}>
              Showing {tasks.length} of {totalTasksCount} entries
              <Link href="/tasks">See all</Link>
            </h3>
          </>
        )}
      </section>
    </section>
  )
}

export default Tasks
