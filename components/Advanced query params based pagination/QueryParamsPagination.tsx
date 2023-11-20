'use client'
import { useEffect, useState } from 'react'
import { handleMaxAllowedCurrentPage } from './maxAllowedCurrentPage'
import { handleMaxAllowedPageSize } from './maxAllowedPagesize'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

  // const [newUrl, setNewUrl] = useState<string>('')
  useEffect(() => {
    if (url.includes('?')) {
      const newUrl = `${url}&page=${currentPage}&pagesize=${currentPageSize}`
      router.push(newUrl)
    } else {
      const newUrl = `${url}?page=${currentPage}&pagesize=${currentPageSize}`
      router.push(newUrl)
    }
    setCurrentPage((prevPage: number) => prevPage)
    // setNewUrl(newUrl)
    // console.log(newUrl)
  }, [currentPage, currentPageSize])

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
      // url={newUrl}
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
