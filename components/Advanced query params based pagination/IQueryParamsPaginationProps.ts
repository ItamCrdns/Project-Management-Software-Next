import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

export interface QueryParamsPaginationProps {
  totalPages: number
  url: string
  searchParams: SearchParamsPageSize
  entityName: string
  totalEntitesCount: number
}
