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
    <section className='space-y-4'>
      <EntityHeader name='tasks' />
      <div>
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
          <ul className='space-y-4 items-stretch'>
            {tasks?.data.map((task: Task, index: number) => (
              <li
                className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                key={index}
              >
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
