import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import LoggedInCard from './LoggedInCard'
import HeaderDescriptor from './HeaderDescriptor'
import EachProject from './EachProject'
import RippleButton from '@/components/ripplebutton/RippleButton'

const ProjectsPage = async (props: {
  children: React.ReactNode
}): Promise<JSX.Element> => {
  const { data } = await getProjects('1', '3') // Page 1 (always) 3 projects per company
  const projects = data as Project[]

  return (
    <>
      {props.children}
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
          {Object.entries(projects).map(([companyName, projects]) => (
            <React.Fragment key={companyName}>
              <div key={companyName} className={styles.companywrapper}>
                <h1>{companyName}</h1>
                {Array.isArray(projects) && projects.length > 0 && (
                  <div>
                    <RippleButton
                      text="More projects..."
                      href={`/projects/company/${projects[0].company.companyId}/${companyName}`}
                      width="125px"
                      backgroundColor='#80B3FF'
                    />
                  </div>
                )}
              </div>
              {Array.isArray(projects) &&
                projects.map((project: Project) => (
                  <EachProject key={project.projectId} project={project} />
                ))}
            </React.Fragment>
          ))}
        </section>
      </main>
    </>
  )
}

export default ProjectsPage
