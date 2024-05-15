'use client'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'
import PaginationUI from './PaginationUI'
import { type PaginationUIProps } from './IPaginationUIProps'
import { handleMaxValue } from './handleMaxValue'
import { useGetSearchParams } from '../Filters/useGetSearchParams'

// TODO: Add a search component to search entities basd on their name

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const {
    totalPages,
    entityName,
    totalEntitesCount,
    defaultPageSize = 10,
    pageSizeName = 'pagesize',
    pageName = 'page'
  } = props.paginationProps

  const { router, pathname, searchParams } = useGetSearchParams()

  const handleCurrentPageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(e, totalPages)

    if (!isNaN(checkedValue)) {
      searchParams.set(pageName, checkedValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(e, totalEntitesCount)

    if (!isNaN(checkedValue)) {
      searchParams.set(pageName, '1')
      searchParams.set(pageSizeName, checkedValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const handleSecondPageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(
      e,
      props.secondEntityProps?.secondEntityTotalCount ?? 0
    )

    if (!isNaN(checkedValue)) {
      searchParams.set('secondpagesize', checkedValue.toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const goToFirstPage = (): void => {
    searchParams.set(pageName, '1')

    if (searchParams.toString() !== undefined) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const goToLastPage = (): void => {
    searchParams.set(pageName, totalPages.toString())

    if (searchParams.toString() !== undefined) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const goToNextPage = (): void => {
    const currentPage = Number(searchParams.get(pageName) ?? 1)

    if (currentPage < totalPages) {
      searchParams.set(pageName, (currentPage + 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const goToPreviousPage = (): void => {
    const currentPage = Number(searchParams.get(pageName))

    if (currentPage > 1) {
      searchParams.set(pageName, (currentPage - 1).toString())

      if (searchParams.toString() !== undefined) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
    }
  }

  const uiProps: PaginationUIProps = {
    unknownProperties: props.paginationProps.unknownProperties,
    pageSizeName,
    paginationProps: {
      currentPageSize: Number(
        searchParams.get(pageSizeName) ?? defaultPageSize
      ),
      currentPage: Number(searchParams.get(pageName) ?? 1),
      currentSecondEntityPageSize: Number(
        searchParams.get('secondpagesize') ?? 10
      ),
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
