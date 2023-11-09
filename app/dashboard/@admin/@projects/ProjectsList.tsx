import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EntityHeader from '../EntityHeader'
import LoadingFetch from '../_fetch loader/LoadingFetch'
import EachProject from '@/app/projects/(list)/EachProject'
import { type Project } from '@/interfaces/project'
import { type SWRGetterReturn } from '@/interfaces/return/SWRGetterReturn'

interface ProjectsProps {
  isLoading: boolean
  isError: unknown
  projects: SWRGetterReturn<Project> | undefined
}

const ProjectsList: React.FC<ProjectsProps> = (props) => {
  const { isLoading, isError, projects } = props

  return (
    <article>
      <EntityHeader
        color="#00A9FF"
        entityName="projects"
      />
      <section className={`${styles.projectswrapper} ${dashboardstyles.menu}`}>
        <HeaderDescriptor dashboard isProject width="300px" />
        {isLoading && <LoadingFetch entityName="projects" />}
        {isError !== undefined && <p>{isError?.toString()}</p>}
        {Array.isArray(projects?.data) && (
          <ul>
            {projects?.data.map((project: Project, index: number) => (
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

export default ProjectsList
