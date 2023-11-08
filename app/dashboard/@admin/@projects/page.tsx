'use client'
import useProjectsGetter from '@/api-calls/getProjectsAdmin'
import { FilterContext } from '@/context/Filter/FilterContext'
import { useContext, useEffect, useState } from 'react'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import ProjectsList from './ProjectsList'

const Projects: React.FC = () => {
  const { filter, updateEntity } = useContext(
    FilterContext
  ) as FilterContextType

  const { projects, isLoading, isError } = useProjectsGetter(
    filter.projects.currentPage,
    filter.projects.pageSize
  )

  console.log(filter)

  const [hasEffectRun, setHasEffectRun] = useState<boolean>(false)

  useEffect(() => { // ! Avoid re-render of the total projects count
    if (!hasEffectRun && projects !== undefined) {
      updateEntity({
        pages: projects?.pages ?? 0,
        count: projects?.count ?? 0
      })

      setHasEffectRun(true)
    }
  }, [projects, hasEffectRun])

  return (
    <ProjectsList isLoading={isLoading} isError={isError} projects={projects} />
  )
}

export default Projects
