import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import Link from 'next/link'
import EmployeeCardProfile from '../(employee)/@employeeCard/page'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'
import { type PaginationProps } from '@/components/Advanced query params based pagination/IQueryParamsPaginationProps'

interface ProjectUIProps {
  username: string
  projects: Project[]
  totalPages: number
  totalProjects: number
}

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const { totalPages, totalProjects } = props
  const username: string = props.username

  const paginationProps: PaginationProps = {
    totalPages,
    entityName: 'Projects',
    totalEntitesCount: totalProjects
  }
  return (
    <section className='flex justify-center gap-4'>
      <div>
        <div className='flex items-center justify-between gap-8 my-8 mx-0'>
          <Link
            className='font-bold text-theming-dark100 dark:text-theming-white100 cursor-pointer'
            href={`/employees/${props.username}`}
          >
            Return to {props.username}&apos;s profile
          </Link>
          <h1>All {username}&apos;s projects</h1>
        </div>
        <div className='flex justify-end'>
          <DataHeader
            dashboard
            pushSearchParams
            entity='projects'
            width='300px'
            sortValues={projectSortValues}
          />
        </div>
        <section className='flex items-start justify-center gap-8'>
          <EmployeeCardProfile params={{ username }} />
          <div className='flex flex-col gap-8'>
            <QueryParamsPagination paginationProps={paginationProps} />
            <div>
              {Array.isArray(props.projects) && (
                <ul className='space-y-4 items-stretch'>
                  {props.projects.map((project: Project) => (
                    <li
                      className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                      key={project.projectId}
                    >
                      <EachProject project={project} showCompanyName />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default ProjectUI
