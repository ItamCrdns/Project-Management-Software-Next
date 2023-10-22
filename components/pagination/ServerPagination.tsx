'use client'
import { useEffect, useState } from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'
import { type SearchParams } from '@/interfaces/searchParams'

interface PaginationProps {
  totalPages: number
  url: string
  searchParams: SearchParams
  reset?: boolean
}

/**
 * Renders a server-side pagination component.
 * Used to perform a server-side pagination with Link
 */

const ServerPagination: React.FunctionComponent<PaginationProps> = ({
  totalPages,
  url,
  searchParams,
  reset
}) => {
  const pageNumberFromUrl = parseInt(searchParams.page)
  const [currentPage, setCurrentPage] = useState<number>(pageNumberFromUrl)

  useEffect(() => {
    if (reset === true) {
      setCurrentPage(1)
      router.push(`${url}?page=${1}`)
    }
  }, [reset])

  const searchValue = searchParams.search
  const router = useRouter()

  const handleChangePage = (action: string): void => {
    if (action === 'previous' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      if (searchValue === undefined) {
        router.push(`${url}?page=${currentPage - 1}`)
      } else {
        router.push(`${url}?page=${currentPage - 1}&search=${searchValue}`)
      }
      searchParams.search = searchValue
    } else if (action === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
      if (searchValue === undefined) {
        router.push(`${url}?page=${currentPage + 1}`)
      } else {
        router.push(`${url}?page=${currentPage + 1}&search=${searchValue}`)
      }
      searchParams.search = searchValue
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
