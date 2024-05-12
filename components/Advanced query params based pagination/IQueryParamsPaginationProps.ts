import { type SecondEntityProps } from './IPaginationUIProps'

export interface PaginationProps {
  totalPages: number
  entityName: string
  totalEntitesCount: number
  defaultPageSize?: number
  unknownProperties?: boolean // ? Pass if totalPages, totalEntitesCount, defaultPageSize are unknown.
}

export interface QueryParamsPaginationProps {
  paginationProps: PaginationProps
  secondEntityProps?: SecondEntityProps
}
