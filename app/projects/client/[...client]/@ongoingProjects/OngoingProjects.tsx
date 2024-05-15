import getOngoingProjectsByClient from '@/api-calls/getOngoingProjectsByClient'
import generateQueryParams from '../../queryParams'
import EachProject from '@/app/projects/(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { internalSearchParamsGenerator } from '../internalSearchParamsGenerator'
import { ExtendedSearchParams } from '../ExtendedSearchParams.interface'

const OngoingProjects: React.FC<{
  clientId: string
  searchParams: ExtendedSearchParams
}> = async (props) => {
  const queryParams = generateQueryParams(
    internalSearchParamsGenerator(
      props.searchParams,
      props.searchParams.ongoing_page ?? '1',
      props.searchParams.ongoing_pagesize ?? '10'
    )
  )

  const { data } = await getOngoingProjectsByClient(props.clientId, queryParams)

  const projects = data?.data ?? []

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <p className='text-lg'>No ongoing projects</p>
      </div>
    )
  }

  const paginationProps = {
    totalPages: data?.pages ?? 0,
    entityName: 'Ongoing Projects',
    totalEntitesCount: data?.count ?? 0,
    pageSizeName: 'ongoing_pagesize',
    pageName: 'ongoing_page'
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
                entityIdentifer='ongoingProjects'
              />
            </li>
          ))}
      </ul>
    </>
  )
}

export default OngoingProjects
