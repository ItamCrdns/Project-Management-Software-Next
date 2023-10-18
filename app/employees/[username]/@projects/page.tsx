import { type Project } from '@/interfaces/project'
import styles from '../employee.module.css'
import getUserProjects from '@/api-calls/getUserProjects'
import Link from 'next/link'

const CurrentProjects = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const { username } = params
  const { data } = await getUserProjects(username, '1', '5')
  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className={styles.projectswrapper}>
      <div className={styles.titlewrapper}>
        <div>
          <span className="material-symbols-outlined">tactic</span>
          <h1>Current projects</h1>
        </div>
      </div>
      {Array.isArray(projects) && projects.length > 0
        ? (
        <>
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <h3>
                  <Link href={`/projects/${project.projectId}`}>
                    {project.name}
                  </Link>
                </h3>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={'/'}>See all {projectsCount} {username} projects</Link>
          </h3>
        </>
          )
        : (
        <p>Here we will show their current projects.</p>
          )}
    </section>
  )
}

export default CurrentProjects
