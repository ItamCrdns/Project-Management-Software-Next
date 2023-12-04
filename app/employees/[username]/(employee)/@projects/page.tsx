import { type Project } from '@/interfaces/project'
import styles from '@/app/projects/(individual)/[projectId]/(projectId)/project.module.css'
import getUserProjectsShowcase from '@/api-calls/getUserProjectsShowcase'
import Link from 'next/link'
import { type UsernameParamsProps } from '@/interfaces/props/UsernameParamsProps'

const CurrentProjects: React.FC<UsernameParamsProps> = async (props) => {
  const { username } = props.params
  const { data } = await getUserProjectsShowcase(username, '1', '5')
  const projects = data?.data
  const projectsCount = data?.count

  return (
    <section className={styles.employees}>
      <div className={styles.headerwrapper}>
        <div>
          <span className='material-symbols-outlined'>emoji_objects</span>
          <h1>Current projects</h1>
        </div>
        <h3>List</h3>
      </div>
      {Array.isArray(projects) && projects.length > 0
        ? (
        <>
          <ul>
            {projects?.map((project: Project) => (
              <li key={project.projectId}>
                <p style={{ margin: 0 }}>
                  <Link href={`/projects/${project.projectId}`}>
                    {project.name}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <h3>
            <Link href={`/employees/${username}/projects?page=1`}>
              See all {projectsCount} projects
            </Link>
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
