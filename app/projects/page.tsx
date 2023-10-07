import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import Link from 'next/link'
import LoggedInCard from './LoggedInCard'

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
        {Array.isArray(projects) && (
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <h1>
                  <Link href={`/projects/${project.projectId}`}>
                    {project.name}
                  </Link>
                </h1>
                <p>
                  <Link href={`/projects/${project.projectId}`}>
                    {project.description}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProjectsPage
