import { getTaskIssues } from '@/api-calls/getTaskIssues'
import generateQueryParams from '@/utility/queryParams'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { NoIssues } from './NoIssues'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import EachIssue from '@/app/issues/EachIssue'

const Issues: React.FC<{
  clientId: string
  taskId: string
  searchParams: SearchParamsPageSize
}> = async (props) => {
  const { clientId, taskId, searchParams } = props

  const queryParams = generateQueryParams(searchParams)

  const { data } = await getTaskIssues(taskId, queryParams)

  const issues = data?.entity.data

  const noIssues =
    data?.entity.count === 0 || !Array.isArray(issues) || issues.length === 0
  const isTaskCreator = data?.isTaskOwner ?? false

  const paginationProps: PaginationProps = {
    totalPages: data?.entity.pages ?? 1,
    entityName: 'Issues',
    totalEntitesCount: data?.entity.count ?? 1
  }

  if (noIssues) {
    return (
      <div className='w-[1200px] text-center'>
        <NoIssues taskId={taskId} isOwner={isTaskCreator} />
      </div>
    )
  }

  return (
    <section className='space-y-8'>
      <div className='w-full'>
        <QueryParamsPagination paginationProps={paginationProps} />
      </div>
      <ul className='space-y-4 items-stretch'>
        {issues.length > 0 &&
          issues.map((issue, index) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={index}
            >
              <EachIssue
                issue={issue}
                showTaskName={false}
                entityBasePath={`clients/${clientId}/projects/${issue.task.projectId}/tasks/${issue.task.taskId}/issues`}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}

export { Issues }
