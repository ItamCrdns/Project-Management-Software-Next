import EachProject from '@/app/projects/(list)/EachProject'
import getOverdueProjectsByClient from '@/api-calls/getOverdueProjectsByClient'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import generateQueryParams from '@/utility/queryParams'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import { internalSearchParamsGenerator } from '../internalSearchParamsGenerator'

const OverdueProjects: React.FC<{
  clientId: string
  searchParams: ExtendedSearchParams
}> = async (props) => {
  const queryParams = generateQueryParams(
    internalSearchParamsGenerator(
      props.searchParams,
      props.searchParams.overdue_page ?? '1',
      props.searchParams.overdue_pagesize ?? '10'
    )
  )

  const { data } = await getOverdueProjectsByClient(props.clientId, queryParams)

  const projects = data?.data ?? []

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <p className='text-lg'>No overdue projects</p>
      </div>
    )
  }

  const paginationProps = {
    totalPages: data?.pages ?? 0,
    entityName: 'Overdue Projects',
    totalEntitesCount: data?.count ?? 0,
    pageSizeName: 'overdue_pagesize',
    pageName: 'overdue_page'
  }

  return (
    <>
      <QueryParamsPagination paginationProps={paginationProps} />
      <ul className='space-y-4'>
        {projects.length > 0 &&
          projects.map((project) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={project.projectId}
            >
              <EachProject
                project={project}
                showCompanyName={false}
                parentEntityId={props.clientId}
              />
            </li>
          ))}
      </ul>
    </>
  )
}

export default OverdueProjects
