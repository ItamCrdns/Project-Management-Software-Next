'use client'
import { useGetSearchParams } from '../Filters/useGetSearchParams'
import Previous from '../Advanced query params based pagination/arrows svgs/Previous'
import Next from '../Advanced query params based pagination/arrows svgs/Next'
import Link from 'next/link'
import First from '../Advanced query params based pagination/arrows svgs/First'
import Last from '../Advanced query params based pagination/arrows svgs/Last'

const ServerPagination = ({
  totalPages,
  currentPage
}: {
  totalPages: number
  currentPage: number
}) => {
  const { pathname, searchParams } = useGetSearchParams()

  return (
    <div className='flex items-center justify-center gap-4 p-4'>
      <Link
        href={(() => {
          searchParams.set('page', '1')

          return `${pathname}?${searchParams.toString()}`
        })()}
      >
        <First />
      </Link>
      <Link
        href={(() => {
          if (currentPage > 1) {
            searchParams.set('page', (currentPage - 1).toString())
          }

          return `${pathname}?${searchParams.toString()}`
        })()}
      >
        <Previous />
      </Link>
      <p className='text-xs text-gray-400'>
        {currentPage} of {totalPages}
      </p>
      <Link
        href={(() => {
          if (currentPage < totalPages) {
            searchParams.set('page', (currentPage + 1).toString())
          }

          return `${pathname}?${searchParams.toString()}`
        })()}
      >
        <Next />
      </Link>
      <Link
        href={(() => {
          searchParams.set('page', totalPages.toString())

          return `${pathname}?${searchParams.toString()}`
        })()}
      >
        <Last />
      </Link>
    </div>
  )
}

export default ServerPagination
