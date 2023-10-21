'use client'
import { useEffect, useState } from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  url: string
  pageFromSearchParams: string
  onPageChange?: (page: number) => void
  reset?: boolean
}

/**
 * Renders a server-side pagination component.
 * Used to perform a server-side pagination with Link
 */

const ServerPagination: React.FunctionComponent<PaginationProps> = ({
  totalPages,
  url,
  pageFromSearchParams,
  onPageChange,
  reset
}) => {
  const pageNumberFromUrl = parseInt(pageFromSearchParams)
  const [currentPage, setCurrentPage] = useState<number>(pageNumberFromUrl)

  useEffect(() => {
    if (onPageChange !== undefined) {
      onPageChange(currentPage)
    }
  }, [currentPage])

  useEffect(() => {
    if (reset === true) {
      console.log('reset')
      setCurrentPage(1)
    }
  }, [reset])

  const router = useRouter()

  const handleChangePage = (action: string): void => {
    if (action === 'previous' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      router.push(`${url}?page=${currentPage - 1}`)
    } else if (action === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
      router.push(`${url}?page=${currentPage + 1}`)
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

export default ServerPagination
