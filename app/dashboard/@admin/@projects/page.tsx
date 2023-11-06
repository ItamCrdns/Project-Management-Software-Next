import getProjectsAdmin from '@/api-calls/getProjectsAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EntityHeader from '../EntityHeader'

const Projects: React.FC = async () => {
  const { data } = await getProjectsAdmin('1', '5') // Gets all the projects.
  const projects = data?.data ?? []

  return (
    <article>
      <EntityHeader
        title="projects"
        color="#00A9FF"
        entityName="projectdashboard"
      />
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isProject width="300px" />
        {Array.isArray(projects) && (
          <ul>
            {projects.map((project: Project, index: number) => (
              <li key={index}>
                <EachProject project={project} showCompanyName />
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}

export default Projects
