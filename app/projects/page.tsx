import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import LoggedInCard from './LoggedInCard'
import HeaderDescriptor from './HeaderDescriptor'
import EachProject from './EachProject'
import groupBy from '@/utility/groupBy'

interface SearchParams {
  page: string
  number: string
}
interface SearchParamsProps {
  searchParams: SearchParams
}

const ProjectsPage = async ({
  searchParams
}: SearchParamsProps): Promise<JSX.Element> => {
  const { page } = searchParams
  const data = await getProjects(page ?? '1', '5')
  const projects = Array.isArray(data?.data) ? (data?.data as Project[]) : []

  const result = groupBy({ items: projects }, (item) => item.company.name)

  const resultArray = Object.entries(result)

  return (
    <main className={styles.main}>
      <section className={styles.projectswrapper}>
        <div className={styles.titlewrapper}>
          <span>
            <span className="material-symbols-outlined">tactic</span>
            <h1>All projects</h1>
          </span>
          <LoggedInCard />
        </div>
        <HeaderDescriptor />
        {Array.isArray(projects) && (
          <ul>
            {resultArray.map(([companyName, projects]) => (
              <React.Fragment key={companyName}>
                <div key={companyName} className={styles.companywrapper}>
                  <h1>{companyName}</h1>
                </div>
                {projects?.map((project: Project) => (
                  <li key={project.projectId}>
                    <EachProject key={project.projectId} project={project} />
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default ProjectsPage
