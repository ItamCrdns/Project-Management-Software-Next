// * Pagination Properties: These properties are directly related to pagination.
interface PaginationProps {
  currentPageSize: number
  currentSecondEntityPageSize?: number
  currentPage: number
  totalEntitesCount: number
  totalPages: number
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

// * Entity Properties: These properties are related to the entity being paginated.
interface EntityProps {
  entityName: string
  handleCurrentPageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePageSizeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSecondPageSizeInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

// * Second Entity Properties: These properties are related to a second entity that might be paginated.
export interface SecondEntityProps {
  secondEntity?: string
  secondEntityTotalCount?: number
  secondEntityTotalPages?: number
}
export interface PaginationUIProps {
  paginationProps: PaginationProps
  entityProps: EntityProps
  secondEntityProps?: SecondEntityProps
  unknownProperties?: boolean
}
