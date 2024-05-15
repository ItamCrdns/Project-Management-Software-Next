'use client'
import { useGetSearchParams } from '../Filters/useGetSearchParams'
import Previous from '../Advanced query params based pagination/arrows svgs/Previous'
import Next from '../Advanced query params based pagination/arrows svgs/Next'
import Link from 'next/link'

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
          if (currentPage > 1) {
            searchParams.set('page', (currentPage - 1).toString())
          }

          return `${pathname}?${searchParams.toString()}`
        })()}
      >
        <Previous />
      </Link>
      <p>
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
    </div>
  )
}

export default ServerPagination
