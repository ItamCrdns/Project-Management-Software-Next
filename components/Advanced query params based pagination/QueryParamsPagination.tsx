'use client'
import { useEffect, useState } from 'react'
import { handleMaxAllowedCurrentPage } from './maxAllowedCurrentPage'
import { handleMaxAllowedPageSize } from './maxAllowedPagesize'
import styles from './queryparamspag.module.css'
import { useRouter } from 'next/navigation'
import { handlePageChange } from './handlePageChange'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const { totalPages, url, searchParams, entityName, totalEntitesCount } = props

  const [currentPageSize, setCurrentPageSize] = useState<number>(
    parseInt(searchParams.pagesize ?? '10')
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
    handlePageChange({
      currentPage,
      url,
      updateCurrentPage
    })
  }, [currentPage])

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedPageSize(e, totalEntitesCount)
    setCurrentPageSize(Number(e.target.value))
  }

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

  return (
    <div className={styles.pagination}>
      <div className={styles.pagesize}>
        <p>Showing</p>
        <input
          type="number"
          defaultValue={currentPageSize}
          onChange={handlePageSizeInputChange}
        />
        <p>
          of {totalEntitesCount} {entityName.toLowerCase()}
        </p>
      </div>
      <div className={styles.prevandnextpage}>
        <div>
          <span
            onClick={() => {
              setCurrentPage(1)
            }}
            className="material-symbols-outlined"
          >
            keyboard_double_arrow_left
          </span>
          <div
            onClick={() => {
              setCurrentPage((prevPage) =>
                currentPage > 1 ? prevPage - 1 : currentPage
              )
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
            <p className={styles.prevnexttext}>Previous</p>
          </div>
        </div>
        <input
          type="number"
          value={currentPage}
          onChange={handleCurrentPageInputChange}
        />
        <p>of {totalPages}</p>
        <div>
          <div
            onClick={() => {
              setCurrentPage((prevPage) =>
                currentPage < totalPages ? prevPage + 1 : currentPage
              )
            }}
          >
            <p className={styles.prevnexttext}>Next</p>
            <span className="material-symbols-outlined">navigate_next</span>
          </div>
          <span
            onClick={() => {
              setCurrentPage(totalPages)
            }}
            className="material-symbols-outlined"
          >
            keyboard_double_arrow_right
          </span>
        </div>
      </div>
    </div>
  )
}

export default QueryParamsPagination
