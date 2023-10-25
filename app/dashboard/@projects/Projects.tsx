import getProjectsShowcase from '@/api-calls/getProjectsShowcase'
import Link from 'next/link'
import styles from '../banner.module.css'
import { type Project } from '@/interfaces/project'

const Projects = async (): Promise<JSX.Element> => {
  const { data } = await getProjectsShowcase('1', '5')
  const projects = data?.data

  return (
    <article className={styles.banner}>
      <div className={styles.header}>
        <span className="material-symbols-outlined">tactic</span>
        <h1>Projects</h1>
      </div>
      {Array.isArray(projects) && (
        <ul>
          {projects.map((project: Project) => (
            <li key={project.projectId}>
              <h2>
                <Link href={`/projects/${project.projectId}`}>
                  {project.name}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default Projects
