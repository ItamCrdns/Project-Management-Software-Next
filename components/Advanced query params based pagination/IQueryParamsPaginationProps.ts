export interface PaginationProps {
  totalPages: number
  entityName: string
  totalEntitesCount: number
  defaultPageSize?: number
  unknownProperties?: boolean // ? Pass if totalPages, totalEntitesCount, defaultPageSize are unknown.
  pageSizeName?: string // ? Pass if the name of the pageSize is different from 'pagesize'. Example: 'entity_pagesize'.
  pageName?: string // ? Pass if the name of the page is different from 'page'. Example: 'entity_page'.
}

export interface QueryParamsPaginationProps {
  paginationProps: PaginationProps
  secondEntityProps?: SecondEntityProps
}

export interface SecondEntityProps {
  secondEntity?: string
  secondEntityTotalCount?: number
  secondEntityTotalPages?: number
}
