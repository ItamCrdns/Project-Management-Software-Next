'use client'
import { handleMaxAllowedCurrentPage } from './maxAllowedCurrentPage'
import { handleMaxAllowedPageSize } from './maxAllowedPagesize'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'
import PaginationUI from './PaginationUI'
import { type PaginationUIProps } from './IPaginationUIProps'

// TODO: Add a search component to search entities basd on their name

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const { totalPages, entityName, totalEntitesCount } = props.paginationProps

  const pathname = usePathname()
  const router = useRouter()

  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const handleCurrentPageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedCurrentPage(e, totalPages)
    const newValue = Number(e.target.value)

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
    const checkedValue = handleMaxAllowedPageSize(e, totalEntitesCount)

    if (!isNaN(checkedValue)) {
      searchParams.set('page', '1')
      searchParams.set('pagesize', checkedValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const handleSecondPageSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checkedValue = handleMaxAllowedPageSize(e, props.secondEntityProps?.secondEntityTotalCount ?? 0)

    if (!isNaN(checkedValue)) {
      searchParams.set('secondpagesize', checkedValue.toString())

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
    const currentPage = Number(searchParams.get('page'))

    if (currentPage < totalPages) {
      searchParams.set('page', (currentPage + 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const goToPreviousPage = (): void => {
    const currentPage = Number(searchParams.get('page'))

    if (currentPage > 1) {
      searchParams.set('page', (currentPage - 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const uiProps: PaginationUIProps = {
    paginationProps: {
      currentPageSize: Number(searchParams.get('pagesize') ?? 10),
      currentPage: Number(searchParams.get('page') ?? 1),
      currentSecondEntityPageSize: Number(searchParams.get('secondpagesize') ?? 10),
      totalEntitesCount,
      totalPages,
      goToFirstPage,
      goToLastPage,
      goToNextPage,
      goToPreviousPage
    },
    entityProps: {
      entityName,
      handleCurrentPageInputChange,
      handlePageSizeInputChange,
      handleSecondPageSizeInputChange
    },
    secondEntityProps: props.secondEntityProps
  }

  return <PaginationUI {...uiProps} />
}

export default QueryParamsPagination
