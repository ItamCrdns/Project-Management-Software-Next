import getTasksAdmin from '@/api-calls/getTasksAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import EachTask from '@/app/projects/(individual)/[projectId]/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import Footer from '../../Footer'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'

const Tasks = async (): Promise<JSX.Element> => {
  const { data } = await getTasksAdmin('1', '5')
  const tasks = data?.data ?? []
  const totalTasksCount = data?.count ?? 0

  return (
    <article>
      <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#1A5D1A', textAlign: 'center' }}>LATEST TASKS</h1>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isTask />
        {Array.isArray(tasks) && (
          <>
            <ul>
              {tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <EachTask task={task} showProjectName />
                </li>
              ))}
            </ul>
            <Footer
              showingCount={tasks.length}
              totalCount={totalTasksCount}
              href="/tasks"
            />
          </>
        )}
      </section>
    </article>
  )
}

export default Tasks
