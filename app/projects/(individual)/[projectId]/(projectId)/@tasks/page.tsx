import { type Task } from '@/interfaces/task'
import styles from '@/app/projects/(list)/projectslist.module.css'
import taskstyles from './tasks.module.css'
import getProjectTasks from '@/api-calls/getProjectTasks'
import EachTask from './EachTask'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'

interface TasksProps {
  params: { projectId: string }
}

const TasksParallel: React.FC<TasksProps> = async (props) => {
  const projectId = props.params.projectId

  const queryParams: IFilterProperties = {
    page: '1',
    pageSize: '5',
    orderBy: 'Name', // ! Placeholder orderBy and sort. Might not change them idk
    sort: 'ascending'
  }

  const { data } = await getProjectTasks(projectId, queryParams)

  const tasks = data?.entity.data

  return (
    <section className={taskstyles.tasks}>
      <section className={styles.projectswrapper}>
        <div className={styles.companywrapper}>
          <h1>Tasks</h1>
          <div>
            <RippleButton
              text='Show all tasks'
              backgroundColor='var(--blue)'
              textColor='white'
              href={`/projects/${projectId}/tasks`}
            />
          </div>
        </div>
        <DataHeader
          dashboard={false}
          width='300px'
          pushSearchParams={false}
          sortValues={projectSortValues} // TODO: FIX WRONG
        />
        {Array.isArray(tasks) && (
          <ul>
            {tasks.length > 0 &&
              tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <EachTask task={task} showProjectName={false} />
                </li>
              ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default TasksParallel
