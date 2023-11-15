import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import styles from './projectslist.module.css'
import HeaderDescriptor from './HeaderDescriptor'
import EachProject from './EachProject'
import RippleButton from '@/components/ripplebutton/RippleButton'
import TitleWrapper from '../../../components/Header title/TitleWrapper'
import { type ProjectsListProps } from '@/interfaces/props/ProjectsListProps'

const ProjectsPage: React.FC<ProjectsListProps> = async (props) => {
  const { data } = await getProjects('1', '2') // Page 1 (always) 3 projects per company
  const projects = data as Project[]

  return (
    <>
      {props.children}
      <main className={styles.main}>
        <TitleWrapper
          title="Projects overview"
          icon="emoji_objects"
          buttonText="New project"
          buttonHref="/projects/new"
          // isProject
        />
        <section className={styles.projectswrapper}>
          {/* <HeaderDescriptor dashboard={false} entity='projects' width="300px" /> */}
          {Object.entries(projects).map(([companyName, projects]) => (
            <React.Fragment key={companyName}>
              <div key={companyName} className={styles.companywrapper}>
                <h1>{companyName}</h1>
                {Array.isArray(projects) && projects.length > 0 && (
                  <div>
                    <RippleButton
                      text="More projects..."
                      href={`/projects/client/${projects[0].company.companyId}/${companyName}`}
                      width="125px"
                      textColor="white"
                      backgroundColor="#80B3FF"
                    />
                  </div>
                )}
              </div>
              {Array.isArray(projects) && (
                <ul>
                  {projects.map((project: Project, index: number) => (
                    <li key={index}>
                      <EachProject project={project} showCompanyName={false} />
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </section>
      </main>
    </>
  )
}

export default ProjectsPage
