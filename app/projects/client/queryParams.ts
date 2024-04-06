import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'
import { type IFilterProperties } from '@/interfaces/props/context props/IFilter'
import checkAndSetOrderBy from '@/utility/checkAndSetOrderBy'
import checkAndSetSort from '@/utility/checkAndSetSort'
import urlSearchParamsNumberVerifier from '@/utility/urlSearchParamsNumberVerifier'

/**
 * Generates query parameters based on the provided search parameters.
 * Sanitizes the search parameters and sets default values if needed.
 */

const generateQueryParams = (
  searchParams: SearchParamsPageSize
): IFilterProperties => {
  const sanitizedPage = urlSearchParamsNumberVerifier(searchParams.page ?? '1')
  const sanitizedPageSize = urlSearchParamsNumberVerifier(
    searchParams.pagesize ?? '10'
  )

  const sanitizedSecondPageSize = urlSearchParamsNumberVerifier(searchParams.secondpagesize ?? '10')

  // TODO: Send search params based on whats in the URL.
  // * I think ill just conditionally check if author or priority exists, and send the the
  // * FilterBy: Author and FilterValue: 1-2-3 (whatever is the author query param value)

  let filterBy: string = ''
  let filterValue: string = ''

  // * Send the filterBy and the filterValue separated by an underscore.
  // ? &filterBy=priority_author&filterValue=1_3-25-62'
  // ? The above translates to FilterBy priority and FilterValue 1, and FilterBy author and FilterValue 3-25-62
  // * They will be split on the backend.

  const priorityValue = searchParams.priority ?? ''

  // * Kind of hard to mantain this, but it works.
  if (searchParams.priority !== undefined || searchParams.author !== undefined) {
    if (searchParams.priority !== undefined) {
      filterBy += 'priority'
      filterValue += priorityValue

      if (searchParams.author !== undefined) {
        filterBy += '_projectcreatorid'
        filterValue += '_' + searchParams.author
      }
    } else if (searchParams.author !== undefined) {
      filterBy += 'projectcreatorid'
      filterValue += searchParams.author
    }
  }

  const queryParams: IFilterProperties = {
    page: sanitizedPage,
    pageSize: sanitizedPageSize,
    secondPageSize: sanitizedSecondPageSize,
    sort: checkAndSetSort(searchParams.sort) ?? 'ascending',
    orderBy: checkAndSetOrderBy(searchParams.orderby) ?? 'Name',
    filterBy,
    filterValue,
    searchBy: 'Name',
    searchValue: searchParams.searchValue ?? ''
  }

  if (searchParams.page !== sanitizedPage) {
    searchParams.page = sanitizedPage.toString()
  }

  if (searchParams.pagesize !== sanitizedPageSize) {
    searchParams.pagesize = sanitizedPageSize.toString()
  }

  return queryParams
}

export default generateQueryParams
