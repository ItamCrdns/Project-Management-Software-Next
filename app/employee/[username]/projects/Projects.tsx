import getUserProjects from '@/api-calls/getUserProjects'
import EachProject from '@/app/projects/(list)/EachProject'
import generateQueryParams from '@/utility/queryParams'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

const Projects = async (props: {
  username: string
  searchParams: SearchParamsPageSize
}): Promise<React.ReactElement> => {
  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getUserProjects(props.username, queryParams)

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0
  const totalProjects = data?.count ?? 0

  const noProjects =
    data?.count === 0 || !Array.isArray(data?.data) || projects.length === 0

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Projects',
    totalEntitesCount: totalProjects
  }

  if (noProjects) {
    return <div>No projects found</div>
  }

  return (
    <>
      <QueryParamsPagination paginationProps={paginationProps} />
      <ul className='space-y-4 items-stretch'>
        {projects.map((project) => (
          <li
            className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
            key={project.projectId}
          >
            <EachProject
              project={project}
              showCompanyName
              parentEntityId={project.company.companyId.toString()}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export { Projects }
