'use client'
import { useState } from 'react'
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
    setCurrentPage(Number(e.target.value))
  }

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleMaxAllowedPageSize(e, totalEntitesCount)
    setCurrentPageSize(Number(e.target.value))
  }

  const router = useRouter()

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
          //   max={5}
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
              handlePageChange({
                action: 'first',
                currentPage,
                url,
                totalPages,
                updateCurrentPage
              })
            }}
            className="material-symbols-outlined"
          >
            keyboard_double_arrow_left
          </span>
          <div
            onClick={() => {
              handlePageChange({
                action: 'previous',
                currentPage,
                url,
                totalPages,
                updateCurrentPage
              })
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
            <p className={styles.prevnexttext}>Previous</p>
          </div>
        </div>
        <input
          type="number"
          //   max={50}
          defaultValue={currentPage}
          onChange={handleCurrentPageInputChange}
        />
        <p>of {totalPages}</p>
        <div>
          <div
            onClick={() => {
              handlePageChange({
                action: 'next',
                currentPage,
                url,
                totalPages,
                updateCurrentPage
              })
            }}
          >
            <p className={styles.prevnexttext}>Next</p>
            <span className="material-symbols-outlined">navigate_next</span>
          </div>
          <span
            onClick={() => {
              handlePageChange({
                action: 'last',
                currentPage,
                url,
                totalPages,
                updateCurrentPage
              })
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
