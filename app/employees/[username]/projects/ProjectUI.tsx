import styles from '../(employee)/employee.module.css'
import projectStyles from '@/app/projects/(list)/projectslist.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import Link from 'next/link'
import EmployeeCardProfile from '../(employee)/@employeeCard/page'
import { projectSortValues } from '@/components/Data Header/sortValues'
import DataHeader from '@/components/Data Header/DataHeader'

interface ProjectUIProps {
  username: string
  projects: Project[]
  totalPages: number
  totalProjects: number
}

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  const username: string = props.username

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
          <DataHeader
            dashboard
            pushSearchParams
            entity='projects'
            width='300px'
            sortValues={projectSortValues}
          />
        </div>
        <section className={styles.projects}>
          <EmployeeCardProfile params={{ username }} />
          <div className={styles.paramsandprojectswrapper}>
            <QueryParamsPagination
              totalPages={props.totalPages}
              entityName='Projects'
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
