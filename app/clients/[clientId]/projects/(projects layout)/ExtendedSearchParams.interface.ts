import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

export interface ExtendedSearchParams extends SearchParamsPageSize {
  // pageSize
  ongoing_pagesize?: string
  finalized_pagesize?: string
  overdue_pagesize?: string
  not_started_pagesize?: string

  // page
  ongoing_page?: string
  finalized_page?: string
  overdue_page?: string
  not_started_page?: string
}
