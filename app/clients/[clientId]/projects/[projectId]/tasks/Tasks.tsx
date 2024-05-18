import { type Task } from '@/interfaces/task'
import EachTask from '../(projectId layout)/@tasks/EachTask'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import getProjectTasks from '@/api-calls/getProjectTasks'
import generateQueryParams from '@/utility/queryParams'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { NoTasks } from './NoTasks'

const Tasks: React.FC<{
  projectId: string
  clientId: string
  searchParams: SearchParamsPageSize
}> = async (props) => {
  const { projectId, clientId } = props
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

  const noTasks =
    data?.entity.count === 0 || !Array.isArray(tasks) || tasks.length === 0

  if (noTasks) {
    return (
      <div style={{ width: '1200px' }} className='text-center'>
        <NoTasks
          isOwner={data?.isProjectOwner ?? false}
          projectId={Number(projectId)}
        />
      </div>
    )
  }

  return (
    <section className='space-y-8'>
      <div className='w-full'>
        <QueryParamsPagination paginationProps={paginationProps} />
      </div>
      <ul className='space-y-4 items-stretch'>
        {tasks.length > 0 &&
          tasks.map((task: Task, index: number) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={index}
            >
              <EachTask
                task={task}
                showProjectName={false}
                entityBasePath={`clients/${clientId}/projects/${projectId}/tasks`}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}

export { Tasks }
