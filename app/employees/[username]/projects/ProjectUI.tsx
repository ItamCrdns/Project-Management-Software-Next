import styles from '../(employee)/employee.module.css'
import projectStyles from '@/app/projects/(list)/projectslist.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import Link from 'next/link'

interface ProjectUIProps {
  username: string
  projects: Project[]
  totalPages: number
  totalProjects: number
  searchParams: SearchParamsPageSize
}

const ProjectUI: React.FC<ProjectUIProps> = (props) => {
  return (
    <section className={styles.projects}>
      <div className={projectStyles.main}>
      <Link
        href={`/employees/${props.username}`}
        className={styles.closebutton}
      >
        Return to {props.username}&apos;s profile
      </Link>
        <h1 style={{ margin: 0, fontWeight: 500 }}>
          Showing projects where{' '}
          <span style={{ textTransform: 'capitalize' }}>{props.username}</span>{' '}
          is working on
        </h1>
        <QueryParamsPagination
          url={`/employees/${props.username}/projects`}
          totalPages={props.totalPages}
          searchParams={props.searchParams}
          entityName="Projects"
          totalEntitesCount={props.totalProjects}
        />
        <section className={projectStyles.projectswrapper}>
          {/* <HeaderDescriptor dashboard width='300px' entity='usernamenotused' /> */}
          {Array.isArray(props.projects) && (
            <ul>
              {props.projects.map((project: Project) => (
                <li key={project.projectId}>
                  <EachProject project={project} showCompanyName />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  )
}

export default ProjectUI
