export interface PaginationProps {
  totalPages: number
  onPageChange: (page: number) => void
  reset?: boolean
  iconSize?: string
}
