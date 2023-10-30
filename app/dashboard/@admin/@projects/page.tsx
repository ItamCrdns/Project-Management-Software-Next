import getProjectsAdmin from '@/api-calls/getProjectsAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
// import Footer from '../../Footer'

const Projects = async (): Promise<JSX.Element> => {
  const { data } = await getProjectsAdmin('1', '5') // Gets all the projects.
  const projects = data?.data ?? []
  // const totalProjectsCount = data?.count ?? 0

  return (
    <article>
      <h1 style={{ fontSize: '32px', fontWeight: 600, color: '#00A9FF' }}>LATEST PROJECTS</h1>
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isProject width='300px'/>
        {Array.isArray(projects) && (
          <>
            <ul>
              {projects.map((project: Project, index: number) => (
                <li key={index}>
                  <EachProject project={project} showCompanyName />
                </li>
              ))}
            </ul>
            {/* <Footer
              showingCount={projects.length}
              totalCount={totalProjectsCount}
              href="/projects"
            /> */}
          </>
        )}
      </section>
    </article>
  )
}

export default Projects
