import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import Link from 'next/link'
import LoggedInCard from './LoggedInCard'
import { relativeTime } from '@/utility/relativeTime'
import ProjectCreator from './ProjectCreator'
import ProjectEmployees from './ProjectEmployees'
import ProjectPriority from './Priority'

interface SearchParams {
  page: string
  number: string
}
interface SearchParamsProps {
  searchParams: SearchParams
}

const ProjectsPage = async ({
  searchParams
}: SearchParamsProps): Promise<JSX.Element> => {
  const { page } = searchParams
  const data = await getProjects(page ?? '1', '5')
  const projects = data?.data as Project

  return (
    <main className={styles.main}>
      <section className={styles.projectswrapper}>
        <div className={styles.titlewrapper}>
          <span>
            <span className="material-symbols-outlined">tactic</span>
            <h1>All projects</h1>
          </span>
          <LoggedInCard />
        </div>
        <header className={styles.descriptor}>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">signature</span>
            Name
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">person</span>
            Creator
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">group</span>
            Employees
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">priority_high</span>
            Priority
          </span>
          <span style={{ width: '300px', justifyContent: 'center' }}>
            <span className="material-symbols-outlined">calendar_month</span>
            Created
          </span>
        </header>
        {Array.isArray(projects) && (
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <div>
                  {/* Project names */}
                  <h1>
                    <Link href={`/projects/${project.projectId}`}>
                      {project.name}
                    </Link>
                  </h1>
                </div>
                {/* Project creator and employees */}
                <ProjectCreator creator={project.projectCreator} />
                <ProjectEmployees employees={project.employees} />
                <ProjectPriority priority={project.priority} />
                <div>
                  {/* Project priority */}
                  <p>
                    {relativeTime(new Date(project.created ?? '').getTime())}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProjectsPage
