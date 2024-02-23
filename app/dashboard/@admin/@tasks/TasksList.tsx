import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import EntityHeader from '../EntityHeader'
import LoadingFetch from '../_fetch loader/LoadingFetch'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import {
  type IFilter,
  type IFilterProperties
} from '@/interfaces/props/context props/IFilter'
import { taskSortValues } from './sortValues'
import DataHeader from '@/components/Data Header/DataHeader'

interface TasksProps {
  isLoading: boolean
  isError: unknown
  tasks: SWRGetterReturn<Task> | undefined
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void
}

const TasksList: React.FC<TasksProps> = (props) => {
  const { isLoading, isError, tasks } = props

  return (
    <section>
      <EntityHeader name='tasks' />
      <div className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <DataHeader
          dashboard
          pushSearchParams={false}
          entity='tasks'
          width='200px'
          updateFilter={props.updateFilter}
          sortValues={taskSortValues}
        />
        {isLoading && <LoadingFetch entityName='tasks' />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(tasks?.data) && (
          <ul>
            {tasks?.data.map((task: Task, index: number) => (
              <li key={index}>
                <EachTask task={task} showProjectName width='200px' />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default TasksList
