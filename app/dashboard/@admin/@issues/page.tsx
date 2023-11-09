'use client'
import getIssuesAdmin from '@/api-calls/getIssuesAdmin'
import { useContext } from 'react'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import entitySetter from '../../EntitySetter'
import { type IEntity } from '@/interfaces/props/context props/IEntity'
import IssuesList from './IssuesList'

const Issues: React.FC = () => {
  const { filter, entity, updateEntity } = useContext(
    FilterContext
  ) as FilterContextType

  const currentPage = filter.issues.currentPage ?? '1'
  const pageSize = filter.issues.pageSize ?? '1'

  const { issues, isLoading, isError } = getIssuesAdmin(currentPage, pageSize)

  const props = {
    entityT: issues,
    entityU: entity,
    entityName: 'issues' as keyof IEntity,
    updateEntity
  }

  entitySetter(props)

  return <IssuesList isLoading={isLoading} isError={isError} issues={issues} />
}

export default Issues
