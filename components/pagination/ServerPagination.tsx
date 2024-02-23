'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type SearchParams } from '@/interfaces/searchParams'
import { type SearchParamsPageSize } from '@/interfaces/props/ClientNameProps'

interface PaginationProps {
  totalPages: number
  url: string
  searchParams: SearchParams | SearchParamsPageSize
  reset?: boolean
}

/**
 * Renders a server-side pagination component.
 * Used to perform a server-side pagination with Link
 */

const ServerPagination: React.FunctionComponent<PaginationProps> = (props) => {
  const { totalPages, url, searchParams, reset } = props
  const pageNumberFromUrl =
    searchParams.page !== undefined
      ? parseInt(searchParams.page) > totalPages
        ? 1
        : parseInt(searchParams.page)
      : 1
  const [currentPage, setCurrentPage] = useState<number>(pageNumberFromUrl)

  useEffect(() => {
    setCurrentPage(pageNumberFromUrl)
    // ? Fixes the bug where the page number is not updated when the initial url search param is not 1
  }, [pageNumberFromUrl])

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
      const pageParam = url.includes('?')
        ? `&page=${currentPage - 1}`
        : `?page=${currentPage - 1}`
      const searchParam =
        searchValue !== undefined ? `&search=${searchValue}` : ''
      const newUrl = `${url}${pageParam}${searchParam}`
      router.push(newUrl)
      searchParams.search = searchValue
    } else if (action === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
      const pageParam = url.includes('?')
        ? `&page=${currentPage + 1}`
        : `?page=${currentPage + 1}`
      const searchParam =
        searchValue !== undefined ? `&search=${searchValue}` : ''
      const newUrl = `${url}${pageParam}${searchParam}`
      router.push(newUrl)
      searchParams.search = searchValue
    }
  }

  return (
    <div className='flex items-center justify-center gap-4 p-4'>
      <svg
        onClick={() => {
          handleChangePage('previous')
        }}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 cursor-pointer text-azure-radiance-500'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5 8.25 12l7.5-7.5'
        />
      </svg>
      <p>
        {currentPage} of {totalPages}
      </p>
      <svg
        onClick={() => {
          handleChangePage('next')
        }}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 cursor-pointer text-azure-radiance-500'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m8.25 4.5 7.5 7.5-7.5 7.5'
        />
      </svg>
    </div>
  )
}

export default ServerPagination
