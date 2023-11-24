'use client'
import styles from './pagination.module.css'
import { useEffect, useState } from 'react'
import { type PaginationProps } from '@/interfaces/props/PaginationProps'

const Pagination: React.FC<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { onPageChange, totalPages, reset, borderRadiusValue } = props

  useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (reset !== null) {
      setCurrentPage(1)
    }
  }, [reset])

  const goToPreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const goToNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const borderStyle = {
    borderRadius: borderRadiusValue ?? '5px'
  }

  return (
    <div className={styles.pagination} style={borderStyle}>
      <span onClick={goToPreviousPage}>Previous</span>
      <p>
        {currentPage} of {totalPages}
      </p>
      <span onClick={goToNextPage}>Next</span>
    </div>
  )
}

export default Pagination
