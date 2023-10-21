import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import ServerPagination from '@/components/pagination/ServerPagination'
import styles from '@/app/projects/(list)/projectslist.module.css'

interface ProjectsListProps {
  projects: Project[]
  username: string
  totalPages: number
  pageFromSearchParams: string
}

const ProjectList: React.FunctionComponent<ProjectsListProps> = ({
  projects,
  username,
  totalPages,
  pageFromSearchParams
}) => {
  return (
    <main className={styles.main}>
      <h1 style={{ margin: 0, fontWeight: 500 }}>
        Showing only{' '}
        <span style={{ textTransform: 'capitalize' }}>{username}</span> Projects
      </h1>
      <section className={styles.projectswrapper}>
        <HeaderDescriptor />
        {Array.isArray(projects) && (
          <ul>
            {projects.map((project: Project) => (
              <li key={project.projectId}>
                <EachProject project={project} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <ServerPagination
        url={`/employees/${username}/projects`}
        totalPages={totalPages}
        pageFromSearchParams={pageFromSearchParams}
      />
    </main>
  )
}

export default ProjectList
