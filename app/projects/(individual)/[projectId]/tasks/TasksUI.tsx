import getProjectTasks from '@/api-calls/getProjectTasks'
import { type Task } from '@/interfaces/task'
import EachTask from '../(projectId)/@tasks/EachTask'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '@/app/projects/client/queryParams'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'

interface TasksUIProps {
  projectId: string
  searchParams: SearchParamsPageSize
}

const TasksUI: React.FC<TasksUIProps> = async (props) => {
  const projectId = props.projectId

  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getProjectTasks(projectId, queryParams)

  const tasks = data?.entity.data

  const totalPages = data?.entity.pages ?? 1
  const totalTasks = data?.entity.count ?? 1

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Tasks',
    totalEntitesCount: totalTasks
  }

  return (
    <section className='space-y-8'>
      <div className='w-full'>
        <QueryParamsPagination paginationProps={paginationProps} />
      </div>
      {Array.isArray(tasks) && (
        <ul className='space-y-4 items-stretch'>
          {tasks.length > 0 &&
            tasks.map((task: Task, index: number) => (
              <li className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300' key={index}>
                <EachTask task={task} showProjectName={false} />
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}

export default TasksUI
