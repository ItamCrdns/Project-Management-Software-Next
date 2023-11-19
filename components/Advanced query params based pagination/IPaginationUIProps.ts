export interface PaginationUIProps {
  currentPageSize: number
  currentPage: number
  totalEntitesCount: number
  entityName: string
  totalPages: number
  handleCurrentPageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePageSizeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}
