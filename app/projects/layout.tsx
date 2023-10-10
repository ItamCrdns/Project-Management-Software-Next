import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import LoggedInCard from './LoggedInCard'
import HeaderDescriptor from './HeaderDescriptor'
import EachProject from './EachProject'

const ProjectsPage = async (props: {
  new: React.ReactNode
}): Promise<JSX.Element> => {
  const { data } = await getProjects('1', '3') // Page 1 (always) 3 projects per company
  const projects = data as Project[]

  return (
    <>
      {props.new}
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
          <ul>
            {Object.entries(projects).map(([companyName, projects]) => (
              <React.Fragment key={companyName}>
                <div key={companyName} className={styles.companywrapper}>
                  <h1>{companyName}</h1>
                  <p>More projects...</p>
                </div>
                {Array.isArray(projects) &&
                  projects.map((project: Project) => (
                    <li key={project.projectId}>
                      <EachProject key={project.projectId} project={project} />
                    </li>
                  ))}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default ProjectsPage
