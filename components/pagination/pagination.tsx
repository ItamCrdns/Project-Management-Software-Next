'use client'
import styles from './pagination.module.css'
import { useEffect, useState } from 'react'

interface PaginationProps {
  totalPages: number
  onPageChange: (page: number) => void
  reset: boolean
}

const Pagination = ({ totalPages, onPageChange, reset }: PaginationProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (reset) {
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
