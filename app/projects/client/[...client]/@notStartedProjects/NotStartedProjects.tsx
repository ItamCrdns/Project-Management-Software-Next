import getFinishedProjectsByClient from '@/api-calls/getFinishedProjectsByClient'
import EachProject from '@/app/projects/(list)/EachProject'
import generateQueryParams from '../../queryParams'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { internalSearchParamsGenerator } from '../internalSearchParamsGenerator'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'
import getNotStartedProjectsByClient from '@/api-calls/getNotStartedProjectsByClient'

const NotStartedProjects = async ({
  clientId,
  searchParams
}: {
  clientId: string
  searchParams: ExtendedSearchParams
}) => {
  const queryParams = generateQueryParams(
    internalSearchParamsGenerator(
      searchParams,
      searchParams.not_started_page ?? '1',
      searchParams.not_started_pagesize ?? '10'
    )
  )

  const { data } = await getNotStartedProjectsByClient(clientId, queryParams)

  const projects = data?.data ?? []

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <p className='text-lg'>No finished projects</p>
      </div>
    )
  }

  const paginationProps = {
    totalPages: data?.pages ?? 0,
    entityName: 'Not started Projects',
    totalEntitesCount: data?.count ?? 0,
    pageSizeName: 'not_started_pagesize',
    pageName: 'not_started_page'
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
              <EachProject project={project} showCompanyName={false} />
            </li>
          ))}
      </ul>
    </>
  )
}

export default NotStartedProjects
