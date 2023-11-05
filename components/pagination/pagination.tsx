'use client'
import styles from './pagination.module.css'
import { useEffect, useState } from 'react'
import { type PaginationProps } from '@/interfaces/props/PaginationProps'

const Pagination: React.FunctionComponent<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { onPageChange, totalPages, reset, iconSize } = props

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (reset !== null) {
      setCurrentPage(1)
    }
  }, [reset])

  const handleChangePage = (action: string): void => {
    if (action === 'previous' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    } else if (action === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div className={styles.pagination}>
      <span
        style={{ fontSize: iconSize ?? '' }}
        onClick={() => {
          handleChangePage('previous')
        }}
        className="material-symbols-outlined"
      >
        navigate_before
      </span>
      <p>
        {currentPage} of {totalPages}
      </p>
      <span
        style={{ fontSize: iconSize ?? '' }}
        onClick={() => {
          handleChangePage('next')
        }}
        className="material-symbols-outlined"
      >
        navigate_next
      </span>
    </div>
  )
}

export default Pagination
