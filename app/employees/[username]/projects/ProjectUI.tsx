import styles from '../(employee)/employee.module.css'
import projectStyles from '@/app/projects/(list)/projectslist.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import Link from 'next/link'
import EmployeeCardProfile from '../(employee)/@employeeCard/page'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import { projectSortValues } from '@/app/dashboard/@admin/@projects/sortValues'

interface ProjectUIProps {
  username: string
  projects: Project[]
  totalPages: number
  totalProjects: number
  searchParams: SearchParamsPageSize
}

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const username: string = props.username

  const baseUrl = `/employees/${username}/projects/`

  return (
    <section className={styles.mainwrapper}>
      <div>
        <div style={{ margin: '2rem 0' }} className={styles.titlewrapper}>
          <Link
            href={`/employees/${props.username}`}
            style={{ cursor: 'pointer' }}
          >
            Return to {props.username}&apos;s profile
          </Link>
          <h1>All {username}&apos;s projects</h1>
        </div>
        <div className={styles.headerdescriptorwrapper}>
          <HeaderDescriptor
            dashboard
            entity="projects"
            width="300px"
            sortValues={projectSortValues}
            pushSearchParams
            url={baseUrl}
            searchParams={props.searchParams}
          />
        </div>
        <section className={styles.projects}>
          <EmployeeCardProfile params={{ username }} />
          <div className={styles.paramsandprojectswrapper}>
            <QueryParamsPagination
              url={`/employees/${props.username}/projects`}
              totalPages={props.totalPages}
              searchParams={props.searchParams}
              entityName="Projects"
              totalEntitesCount={props.totalProjects}
            />
            <div className={projectStyles.projectswrapper}>
              {Array.isArray(props.projects) && (
                <ul>
                  {props.projects.map((project: Project) => (
                    <li key={project.projectId}>
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
