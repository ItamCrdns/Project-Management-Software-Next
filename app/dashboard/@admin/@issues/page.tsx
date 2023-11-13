'use client'
import useIssuesGetter from '@/api-calls/getIssuesAdmin'
import { useContext } from 'react'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import entitySetter from '../../EntitySetter'
import { type IEntity } from '@/interfaces/props/context props/IEntity'
import IssuesList from './IssuesList'

const Issues: React.FC = () => {
  const { filter, entity, updateEntity, updateFilter } = useContext(
    FilterContext
  ) as FilterContextType

  const { issues, isLoading, isError } = useIssuesGetter(filter.issues)

  const props = {
    entityT: issues,
    entityU: entity,
    entityName: 'issues' as keyof IEntity,
    updateEntity
  }

  entitySetter(props)

  return (
    <IssuesList
      isLoading={isLoading}
      isError={isError}
      issues={issues}
      updateFilter={updateFilter}
    />
  )
}

export default Issues
