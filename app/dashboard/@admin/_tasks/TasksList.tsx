import EntityHeader from '../EntityHeader'
import EachTask from '@/app/projects/(individual)/[projectId]/(projectId)/@tasks/EachTask'
import { type Task } from '@/interfaces/task'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'
import {
  type IFilter,
  type IFilterProperties
} from '@/interfaces/props/context props/IFilter'
import { taskSortValues } from './sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import LoadingSkeleton from '../_projects/LoadingSkeleton'

interface TasksProps {
  isLoading: boolean
  isError: unknown
  tasks: SWRGetterReturn<Task> | undefined
  updateFilter: (key: keyof IFilter, props: IFilterProperties) => void
  skeletonCount: number
}

const TasksList: React.FC<TasksProps> = (props) => {
  const { isLoading, isError, tasks } = props

  return (
    <section className='space-y-4 mb-8'>
      <EntityHeader name='tasks' />
      <div>
        <DataHeader
          dashboard
          pushSearchParams={false}
          entity='tasks'
          width='300px'
          updateFilter={props.updateFilter}
          sortValues={taskSortValues}
        />
        {isLoading && <LoadingSkeleton skeletonCount={props.skeletonCount} />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(tasks?.data) && (
          <ul className='space-y-4 items-stretch w-[1800px]'>
            {tasks?.data.map((task: Task, index: number) => (
              <li
                className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                key={index}
              >
                <EachTask task={task} showProjectName width='300px' />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default TasksList
