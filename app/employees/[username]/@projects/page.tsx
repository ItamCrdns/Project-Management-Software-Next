import { type Project } from '@/interfaces/project'
import styles from '../employee.module.css'
import getProjectsByUsername from '@/api-calls/getProjectsByUsername'

const CurrentProjects = async ({
  params
}: {
  params: { username: string }
}): Promise<JSX.Element> => {
  const { username } = params
  const data = await getProjectsByUsername(username)
  const projects = data?.data

  return (
    <section className={styles.projectswrapper}>
      <div className={styles.titlewrapper}>
        <span className="material-symbols-outlined">tactic</span>
        <h1>Current projects</h1>
      </div>
      <ul>
        {Array.isArray(projects) &&
          projects?.map((project: Project) => (
            <li key={project.projectId}>
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default CurrentProjects
