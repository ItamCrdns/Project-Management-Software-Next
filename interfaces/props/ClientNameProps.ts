import { type SearchParams } from '../searchParams'
import { type OrderBy, type Sort } from './IFilter'

export interface SearchParamsPageSize extends SearchParams {
  pagesize: string
  orderby: OrderBy
  sort: Sort
  author: string
  priority: string
  secondpagesize?: string
}

export interface ClientNameProps {
  params: {
    clientId: string
  }
  ongoingProjects: React.ReactNode
  finishedProjects: React.ReactNode
  overdueProjects: React.ReactNode
  notStartedProjects: React.ReactNode
  children: React.ReactNode
}
