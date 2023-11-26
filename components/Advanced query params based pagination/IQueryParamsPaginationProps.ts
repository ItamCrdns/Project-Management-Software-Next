import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

export interface QueryParamsPaginationProps {
  totalPages: number
  searchParams: SearchParamsPageSize
  entityName: string
  totalEntitesCount: number
}
