import { type Project } from '@/interfaces/project'
import EachProject from '../../(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import generateQueryParams from '../queryParams'
import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { NoProjects } from './NoProjects'

const Projects: React.FC<{
  clientId: string
  searchParams: SearchParamsPageSize
}> = async (props) => {
  const queryParams = generateQueryParams(props.searchParams)

  const { data } = await getCompanyProjects(props.clientId, queryParams)

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0
  const totalProjects = data?.count ?? 0

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Projects',
    totalEntitesCount: totalProjects
  }

  const noProjects =
    data?.count === 0 || !Array.isArray(projects) || projects.length === 0

  if (noProjects) {
    return (
      <div style={{ width: '1500px' }} className='text-center'>
        <NoProjects />
      </div>
    )
  }

  return (
    <section className='space-y-8'>
      <QueryParamsPagination paginationProps={paginationProps} />
      <ul className='space-y-4'>
        {projects.length > 0 &&
          projects.map((project: Project, index: number) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={index}
            >
              <EachProject project={project} showCompanyName={false} />
            </li>
          ))}
      </ul>
    </section>
  )
}

export { Projects }
