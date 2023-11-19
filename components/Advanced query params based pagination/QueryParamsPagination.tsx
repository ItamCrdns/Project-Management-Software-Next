'use client'
import { useEffect, useState } from 'react'
import { handleMaxAllowedCurrentPage } from './maxAllowedCurrentPage'
import { handleMaxAllowedPageSize } from './maxAllowedPagesize'
import { useRouter } from 'next/navigation'
import { handlePageChange } from './handlePageChange'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'
import PaginationUI from './PaginationUI'

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const { totalPages, url, entityName, totalEntitesCount } = props

  const [currentPageSize, setCurrentPageSize] = useState<number>(
    parseInt(props.searchParams.pagesize ?? '10')
  )
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(props.searchParams.page ?? '1')
  )

  const handleCurrentPageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedCurrentPage(e, totalPages)
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue)) {
      setCurrentPage(newValue)
    }
  }

  useEffect(() => {
    // ? After changing the pagesize take us to the last page if necessary
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages])

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedPageSize(e, totalEntitesCount)
    const newValue = parseInt(e.target.value)

    if (!isNaN(newValue)) {
      setCurrentPageSize(newValue)
    }
  }

  useEffect(() => {
    handlePageChange({
      currentPage,
      currentPageSize,
      url,
      updateCurrentPage
    })
  }, [currentPage, currentPageSize])

  const router = useRouter()

  // ? Might be an unnecesary callback.
  // ? I mean not unnecesary here. But maybe the state update and url push can be done inside the useEffect above
  const updateCurrentPage = (
    callback: (prevPage: number) => number,
    newUrl: string
  ): void => {
    router.push(newUrl)
    setCurrentPage((prevPage) => {
      const newPage = callback(prevPage)
      return newPage
    })
  }

  const goToFirstPage = (): void => {
    setCurrentPage(1)
  }

  const goToLastPage = (): void => {
    setCurrentPage(totalPages)
  }

  const goToNextPage = (): void => {
    setCurrentPage((prevPage) =>
      currentPage < totalPages ? prevPage + 1 : currentPage
    )
  }

  const goToPreviousPage = (): void => {
    setCurrentPage((prevPage) => (currentPage > 1 ? prevPage - 1 : currentPage))
  }

  return (
    <PaginationUI
      currentPageSize={currentPageSize}
      currentPage={currentPage}
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
