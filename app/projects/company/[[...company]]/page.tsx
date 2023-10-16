import getCompanyProjects from '@/api-calls/getCompanyProjects'
import { type Project } from '@/interfaces/project'
import styles from '@/app/projects/(list)/projectslist.module.css'
import EachProject from '../../(list)/EachProject'
import HeaderDescriptor from '../../(list)/HeaderDescriptor'
import LoggedInCard from '../../(list)/_header/LoggedInCard'
import Link from 'next/link'

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

  return (
    <main className={styles.main}>
      <section className={styles.projectswrapper}>
        <div className={styles.titlewrapper}>
          <span>
            <span style={{ fontSize: '50px' }} className="material-symbols-outlined">tactic</span>
            <h1>
              You are viewing{' '}
              <span style={{ color: '#80B3FF' }}>{companyName}</span> projects.
            </h1>
            <Link
              className="material-symbols-outlined"
              style={{ fontWeight: 500, fontSize: '50px' }}
              href="/projects"
            >
              keyboard_return
            </Link>
          </span>
          <LoggedInCard />
        </div>
        <HeaderDescriptor />
        {Array.isArray(projects) &&
          projects.map((project: Project) => (
            <EachProject key={project.projectId} project={project} />
          ))}
      </section>
    </main>
  )
}

export default CompanyProjectsPage
