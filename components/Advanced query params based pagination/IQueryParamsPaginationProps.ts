import { type SecondEntityProps } from './IPaginationUIProps'

export interface PaginationProps {
  totalPages: number
  entityName: string
  totalEntitesCount: number
}

export interface QueryParamsPaginationProps {
  paginationProps: PaginationProps
  secondEntityProps?: SecondEntityProps
}
