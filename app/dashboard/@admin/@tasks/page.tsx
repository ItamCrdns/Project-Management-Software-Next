import getTasksAdmin from '@/api-calls/getTasksAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import EachTask from '@/app/projects/(individual)/[projectId]/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EntityHeader from '../EntityHeader'

const Tasks = async (): Promise<JSX.Element> => {
  const { data } = await getTasksAdmin('1', '5')
  const tasks = data?.data ?? []

  return (
    <article>
      <EntityHeader title='tasks' color='#1A4D1A' entityName='taskdashboard'/>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isTask width='200px' />
        {Array.isArray(tasks) && (
          <>
            <ul>
              {tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <EachTask task={task} showProjectName width='200px' />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </article>
  )
}

export default Tasks
