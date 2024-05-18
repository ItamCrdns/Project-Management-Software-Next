import { SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { ExtendedSearchParams } from './ExtendedSearchParams.interface'

export const internalSearchParamsGenerator = (
  searchParams: ExtendedSearchParams,
  pageValue: string, // ? pass the actual searchParams."page" here, example: searchParams.finalized_page
  pageSizeValue: string // ? pass the actual searchParams."pageSizeValue" here, example: searchParams.finalized_pagesize
): SearchParamsPageSize => {
  return {
    page: pageValue,
    pagesize: pageSizeValue,
    orderby: searchParams.orderby,
    sort: searchParams.sort,
    author: searchParams.author,
    priority: searchParams.priority,
    searchValue: searchParams.searchValue
  }
}
