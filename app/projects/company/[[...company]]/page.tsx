import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type Project } from '@/interfaces/project'
import styles from '@/app/projects/(list)/projectslist.module.css'
import EachProject from '../../(list)/EachProject'
import HeaderDescriptor from '../../(list)/HeaderDescriptor'
import TitleWrapper from '../../(list)/_header/TitleWrapper'

interface CompanyNameProps {
  company: string[]
}

const CompanyProjectsPage = async ({
  params
}: {
  params: CompanyNameProps
}): Promise<JSX.Element> => {
  const companyId = params.company[0]

  const { data } = await getCompanyProjects(companyId, '1', '10')

  const projects = (data as Project[]) ?? []

  // Access the company name from one of the projects (its fine they all have the same company name)
  const companyName = projects.length > 0 && projects[0].company.name

  const title = `You are viewing ${companyName} projects.`

  return (
    <main className={styles.main}>
      <TitleWrapper title={title} returnToProjects={true} />
      <section className={styles.projectswrapper}>
        <HeaderDescriptor dashboard={false}/>
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
