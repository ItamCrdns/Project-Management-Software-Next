import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import ServerPagination from '@/components/pagination/ServerPagination'
import styles from '@/app/projects/(list)/projectslist.module.css'
import { type SearchParams } from '@/interfaces/searchParams'

interface ProjectsListProps {
  projects: Project[]
  username: string
  totalPages: number
  searchParams: SearchParams
}

const ProjectList: React.FunctionComponent<ProjectsListProps> = ({
  projects,
  username,
  totalPages,
  searchParams
}) => {
  return (
    <main className={styles.main}>
      <h1 style={{ margin: 0, fontWeight: 500 }}>
        Showing projects where{' '}
        <span style={{ textTransform: 'capitalize' }}>{username}</span> is
        working on
      </h1>
      <section className={styles.projectswrapper}>
        <HeaderDescriptor dashboard width='300px' />
        {Array.isArray(projects) && (
          <ul>
            {projects.map((project: Project) => (
              <li key={project.projectId}>
                <EachProject project={project} showCompanyName />
              </li>
            ))}
          </ul>
        )}
      </section>
      <ServerPagination
        url={`/employees/${username}/projects`}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </main>
  )
}

export default ProjectList
