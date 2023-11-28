'use client'
import { handleMaxAllowedCurrentPage } from './maxAllowedCurrentPage'
import { handleMaxAllowedPageSize } from './maxAllowedPagesize'
import { usePathname, useRouter } from 'next/navigation'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'
import PaginationUI from './PaginationUI'
import { setInitialSearchParams } from '../Filters/setInitialSearchParams'

// TODO: Add a search component to search entities basd on their name

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const { totalPages, entityName, totalEntitesCount } = props

  const pathname = usePathname()
  const router = useRouter()

  const searchParams = setInitialSearchParams()

  const handleCurrentPageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedCurrentPage(e, totalPages)
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue)) {
      searchParams.set('page', newValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedPageSize(e, totalEntitesCount)
    const newValue = parseInt(e.target.value)

    if (!isNaN(newValue)) {
      searchParams.set('page', '1')
      searchParams.set('pagesize', newValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const goToFirstPage = (): void => {
    searchParams.set('page', '1')

    if (searchParams.toString() !== undefined) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const goToLastPage = (): void => {
    searchParams.set('page', totalPages.toString())

    if (searchParams.toString() !== undefined) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const goToNextPage = (): void => {
    const currentPage = parseInt(searchParams.get('page') ?? '1')

    if (currentPage < totalPages) {
      searchParams.set('page', (currentPage + 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const goToPreviousPage = (): void => {
    const currentPage = parseInt(searchParams.get('page') ?? '1')

    if (currentPage > 1) {
      searchParams.set('page', (currentPage - 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  return (
    <PaginationUI
      currentPageSize={parseInt(props.searchParams.pagesize) ?? 10}
      currentPage={parseInt(props.searchParams.page) ?? 1}
      totalEntitesCount={totalEntitesCount}
      entityName={entityName}
      totalPages={totalPages}
      handleCurrentPageInputChange={handleCurrentPageInputChange}
      handlePageSizeInputChange={handlePageSizeInputChange}
      goToFirstPage={goToFirstPage}
      goToLastPage={goToLastPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
    />
  )
}

export default QueryParamsPagination
