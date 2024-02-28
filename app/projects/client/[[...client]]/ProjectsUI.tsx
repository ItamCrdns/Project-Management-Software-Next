import { type Project } from '@/interfaces/project'
import EachProject from '../../(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import { type DictionaryResponse } from '@/interfaces/DictionaryResponse'

const ProjectsUI: React.FC<{ data: DictionaryResponse<Project> | null }> = (props) => {
  const { data } = props

  const projects = data?.data ?? []
  const totalPages = data?.pages ?? 0
  const totalProjects = data?.count ?? 0

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Projects',
    totalEntitesCount: totalProjects
  }

  return (
    Array.isArray(projects) &&
    projects.length > 0 && (
      <section className='space-y-8'>
        <div className='w-full'>
          <QueryParamsPagination paginationProps={paginationProps} />
        </div>
        <ul className='space-y-4 items-stretch'>
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
  )
}

export { ProjectsUI }
