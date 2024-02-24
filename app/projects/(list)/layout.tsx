import React from 'react'
import { type Project } from '@/interfaces/project'
import getProjects from '@/api-calls/getProjects'
import EachProject from './EachProject'
import { Button } from '@/components/Button/Button'
import TitleWrapper from '../../../components/Header title/TitleWrapper'
import { type ProjectsListProps } from '@/interfaces/props/ProjectsListProps'

const ProjectsPage: React.FC<ProjectsListProps> = async (props) => {
  const { data } = await getProjects('1', '5') // Page 1 (always) 3 projects per company
  const projects = data as Project[]

  // TODO: Fix TitleWrapper props
  return (
    <>
      {props.children}
      <main className='flex flex-col justify-center gap-8 rounded-md p-8'>
        <TitleWrapper
          title='Projects overview'
          buttonText='Create a new project'
          buttonHref='/projects/create'
          showButton={true}
        />
        <section className='flex flex-col items-center justify-center'>
          <div className='flex flex-col'>
            {Object.entries(projects).map(([companyName, projects]) => (
              <React.Fragment key={companyName}>
                <div
                  key={companyName}
                  className='flex items-center gap-4 justify-between w-full'
                >
                  <h1 className='m-0 my-6 text-2xl'>{companyName}</h1>
                  {Array.isArray(projects) && projects.length > 0 && (
                    <div>
                      <Button
                        text={`More projects from ${companyName}`}
                        href={`/projects/client/${projects[0].company.companyId}/${companyName}`}
                      />
                    </div>
                  )}
                </div>
                {Array.isArray(projects) && projects.length > 0 && (
                  <ul className='space-y-4 items-stretch'>
                    {projects.map((project: Project, index: number) => (
                      <li
                        className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
                        key={index}
                      >
                        <EachProject
                          project={project}
                          showCompanyName={false}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default ProjectsPage
