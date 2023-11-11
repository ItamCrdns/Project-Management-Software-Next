import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type Project } from '@/interfaces/project'
import styles from '@/app/projects/(list)/projectslist.module.css'
import EachProject from '../../(list)/EachProject'
import HeaderDescriptor from '../../(list)/HeaderDescriptor'
import TitleWrapper from '../../../../components/Header title/TitleWrapper'
import { type ClientNameProps } from '@/interfaces/props/ClientNameProps'

const CompanyProjectsPage: React.FC<ClientNameProps> = async (props) => {
  const clientId = props.params.client[0]

  const { data } = await getCompanyProjects(clientId, '1', '10')

  const projects = (data as Project[]) ?? []

  // Access the company name from one of the projects (its fine they all have the same company name)
  const clientName = projects.length > 0 && projects[0].company.name

  const title = `You are viewing ${clientName} projects.`

  return (
    <main className={styles.main}>
      <TitleWrapper
        title={title}
        icon="emoji_objects"
        buttonText="New project"
        buttonHref="/projects/new"
        // isProject
      />
      <section className={styles.projectswrapper}>
        <HeaderDescriptor dashboard={false} entity='projects' width="300px" />
        {Array.isArray(projects) && (
          <ul>
            {projects.map((project: Project, index: number) => (
              <li key={index}>
                <EachProject project={project} showCompanyName={false} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default CompanyProjectsPage
