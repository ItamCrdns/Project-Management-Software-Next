'use client'
import useProjectsGetter from '@/api-calls/getProjectsAdmin'
import styles from '@/app/projects/(list)/projectslist.module.css'
import dashboardstyles from '@/app/dashboard/dashboard.module.css'
import { type Project } from '@/interfaces/project'
import EachProject from '@/app/projects/(list)/EachProject'
import HeaderDescriptor from '@/app/projects/(list)/HeaderDescriptor'
import EntityHeader from '../EntityHeader'
import LoadingFetch from '../_fetch loader/LoadingFetch'
import { FilterContext } from '@/context/Filter/FilterContext'
import { useContext, useEffect, useState } from 'react'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'

const Projects: React.FC = () => {
  const { filter, updateEntity } = useContext(
    FilterContext
  ) as FilterContextType

  const { projects, isLoading, isError } = useProjectsGetter(
    filter.currentPage,
    filter.pageSize
  )

  const [hasEffectRun, setHasEffectRun] = useState<boolean>(false)

  useEffect(() => {
    // ! Avoid re-render of the total projects count
    if (!hasEffectRun && projects !== undefined) {
      updateEntity({
        pages: projects?.pages ?? 0,
        count: projects?.count ?? 0
      })

      setHasEffectRun(true)
    }
  }, [projects, hasEffectRun])

  return (
    <article>
      <EntityHeader
        title="projects"
        color="#00A9FF"
        entityName="projectdashboard"
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

export default Projects
