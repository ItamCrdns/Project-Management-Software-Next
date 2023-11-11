'use client'
import useProjectsGetter from '@/api-calls/getProjectsAdmin'
import { FilterContext } from '@/context/Filter/FilterContext'
import { useContext } from 'react'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import ProjectsList from './ProjectsList'
import entitySetter from '../../EntitySetter'
import { type IEntity } from '@/interfaces/props/context props/IEntity'

const Projects: React.FC = () => {
  const { filter, entity, updateEntity, updateFilter } = useContext(
    FilterContext
  ) as FilterContextType

  const currentPage = filter.projects.currentPage ?? '1'
  const pageSize = filter.projects.pageSize ?? '5'

  const { projects, isLoading, isError } = useProjectsGetter(
    currentPage,
    pageSize
  )

  const props = {
    entityT: projects,
    entityU: entity,
    entityName: 'projects' as keyof IEntity,
    updateEntity
  }

  entitySetter(props)

  return (
    <ProjectsList
      isLoading={isLoading}
      isError={isError}
      projects={projects}
      updateFilter={updateFilter}
    />
  )
}

export default Projects
