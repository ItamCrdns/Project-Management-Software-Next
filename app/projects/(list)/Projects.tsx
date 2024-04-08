import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import generateQueryParams from '../client/queryParams'
import {
  getProjectsGroupedByCompany,
  type GetProjectsProps
} from '@/api-calls/getProjects'
import { Button } from '@/components/Button/Button'
import { type Project } from '@/interfaces/project'
import EachProject from './EachProject'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'
import { type SecondEntityProps } from '@/components/Advanced query params based pagination/IPaginationUIProps'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'

const Projects: React.FC<{ searchParams: SearchParamsPageSize }> = async (
  props
) => {
  const cleanParams = generateQueryParams(props.searchParams)

  const params: GetProjectsProps = {
    page: cleanParams.page ?? '1',
    pageSize: cleanParams.pageSize ?? '5',
    projectsPageSize: cleanParams.secondPageSize ?? '5'
  }

  const { data, pages, count } = await getProjectsGroupedByCompany(params)

  const projects = data ?? []

  const paginationProps: PaginationProps = {
    totalPages: pages,
    entityName: 'Companies',
    totalEntitesCount: count
  }

  const secondEntityProps: SecondEntityProps = {
    secondEntity: 'Projects per company',
    secondEntityTotalCount: projects[0].count,
    secondEntityTotalPages: projects[0].pages
  }

  return (
    <>
      <QueryParamsPagination
        paginationProps={paginationProps}
        secondEntityProps={secondEntityProps}
      />
      {Array.isArray(projects) && projects.length > 0 && (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <div className='flex items-center justify-between'>
                <h1 className='m-0 my-6 text-xl font-semibold'>
                  {project.companyName}
                </h1>
                <div className='flex gap-4'>
                  {/* Might be cool to check if the user can atually create a project. Either if its a supervisor, or emplyoee of the company, or both. */}
                  <Button
                    text='Create a new project'
                    href={`/projects/create?clientId=${project.companyId}`}
                  />
                  {project.isCurrentUserInTeam && ( // TODO: Adding an employee to work in a project should add them inmediately to the team.
                    <Button text='Your assigned projects' href='' />
                  )}
                  <Button
                    text={`More projects from ${project.companyName}`}
                    href={`/projects/client/${project.companyId}/${project.companyName}`}
                  />
                </div>
              </div>
              <ul className='flex flex-col gap-4 items-stretch'>
                {project.projects.map((project: Project, index: number) => (
                  <li
                    className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                    key={index}
                  >
                    <EachProject project={project} showCompanyName={false} />
                  </li>
                ))}
                <p className='self-end'>
                  Total <span className='font-bold'>{project.companyName}</span>{' '}
                  projects: {project.count}
                </p>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export { Projects }
