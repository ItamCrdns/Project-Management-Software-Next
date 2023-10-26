import getProjectsAdmin from '@/api-calls/getProjectsAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '../dashboard.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import Link from 'next/link'

const Projects = async (): Promise<JSX.Element> => {
  const { data } = await getProjectsAdmin('1', '5') // Gets all the projects.
  const projects = data?.data ?? []
  const totalProjectsCount = data?.count ?? 0

  return (
    <main className={styles.main}>
      <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 600 }}>
        All projects
      </h1>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard />
        {Array.isArray(projects) && (
          <>
            <ul>
              {projects.map((project: Project, index: number) => (
                <li key={index}>
                  <EachProject project={project} showCompanyName />
                </li>
              ))}
            </ul>
            <h3 style={{ fontWeight: 500, marginBottom: 0 }}>
              Showing {projects.length} of {totalProjectsCount} entries
              <Link href="/projects">See all</Link>
            </h3>
          </>
        )}
      </section>
    </main>
  )
}

export default Projects
