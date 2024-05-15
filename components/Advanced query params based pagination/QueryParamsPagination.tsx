'use client'
import { type QueryParamsPaginationProps } from './IQueryParamsPaginationProps'
import { handleMaxValue } from './handleMaxValue'
import { useGetSearchParams } from '../Filters/useGetSearchParams'
import Link from 'next/link'
import { handleInputClick } from './handleInputClick'
import First from './arrows svgs/First'
import Previous from './arrows svgs/Previous'
import Next from './arrows svgs/Next'
import Last from './arrows svgs/Last'

// TODO: Add a search component to search entities basd on their name

const QueryParamsPagination: React.FC<QueryParamsPaginationProps> = (props) => {
  const {
    totalPages,
    entityName,
    totalEntitesCount,
    defaultPageSize = 10,
    pageSizeName = 'pagesize',
    pageName = 'page'
  } = props.paginationProps

  const { router, pathname, searchParams } = useGetSearchParams()

  const handleCurrentPageInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(e, totalPages)

    if (!isNaN(checkedValue)) {
      searchParams.set(pageName, checkedValue.toString())

      router.push(`${pathname}?${searchParams.toString()}`)
    }
  }

  const handlePageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(e, totalEntitesCount)

    if (!isNaN(checkedValue)) {
      searchParams.set(pageName, '1')
      searchParams.set(pageSizeName, checkedValue.toString())

      router.push(`${pathname}?${searchParams.toString()}`)
    }
  }

  const handleSecondPageSizeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checkedValue = handleMaxValue(
      e,
      props.secondEntityProps?.secondEntityTotalCount ?? 0
    )

    if (!isNaN(checkedValue)) {
      searchParams.set('secondpagesize', checkedValue.toString())

      router.push(`${pathname}?${searchParams.toString()}`)
    }
  }

  const currentPageSize = Number(
    searchParams.get(pageSizeName) ?? defaultPageSize
  )

  const pageSize =
    currentPageSize > totalEntitesCount ? totalEntitesCount : currentPageSize

  const current2ndPageSize = Number(searchParams.get('secondpagesize') ?? 10)

  const secondPageSize =
    current2ndPageSize > (props.secondEntityProps?.secondEntityTotalCount ?? 0)
      ? props.secondEntityProps?.secondEntityTotalCount
      : current2ndPageSize

  const currentPage = Number(searchParams.get(pageName) ?? 1)

  return (
    <div className='flex items-center justify-around rounded-md p-4 shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-2'>
        <p>Showing</p>
        <input
          type='number'
          value={pageSize}
          onClick={handleInputClick}
          onChange={handlePageSizeInputChange}
          className='text-center w-10 border-0 outline-0 p-2 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 bg-theming-white200 dark:bg-theming-dark200'
        />
        <p>
          of {totalEntitesCount} {entityName.toLowerCase()}
        </p>
      </div>
      {props.secondEntityProps?.secondEntity !== undefined &&
        props.secondEntityProps?.secondEntity !== '' && (
          <div className='flex items-center gap-2'>
            <p>Showing</p>
            <input
              type='number'
              value={secondPageSize}
              onClick={handleInputClick}
              onChange={handleSecondPageSizeInputChange}
              className='text-center w-10 border-0 outline-0 p-2 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 bg-theming-white200 dark:bg-theming-dark200'
            />
            <p>{props.secondEntityProps?.secondEntity.toLowerCase()}</p>
          </div>
        )}
      <div className='flex items-center gap-4'>
        <Link
          href={(() => {
            searchParams.set(pageName, '1')

            return `${pathname}?${searchParams.toString()}`
          })()}
        >
          <First />
        </Link>
        <Link
          href={(() => {
            if (currentPage > 1) {
              searchParams.set(pageName, (currentPage - 1).toString())
            }

            return `${pathname}?${searchParams.toString()}`
          })()}
          className='flex items-center'
        >
          <Previous />
          <p
            className='text-azure-radiance-600 font-semibold cursor-pointer select-none'
            style={{
              color: totalPages <= 1 || currentPage === 1 ? 'gray' : ''
            }}
          >
            Previous
          </p>
        </Link>
        <input
          type='number'
          value={currentPage}
          onClick={handleInputClick}
          onChange={handleCurrentPageInputChange}
          disabled={totalPages === 1}
          className='text-center w-10 border-0 outline-0 p-2 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 bg-theming-white200 dark:bg-theming-dark200'
        />
        <Link
          href={(() => {
            if (currentPage < totalPages) {
              searchParams.set(pageName, (currentPage + 1).toString())
            }
            return `${pathname}?${searchParams.toString()}`
          })()}
          className='text-azure-radiance-600 font-semibold cursor-pointer select-none flex items-center'
          style={{
            color: totalPages <= 1 || totalPages === currentPage ? 'gray' : ''
          }}
        >
          Next
          <Next />
        </Link>
        <Link
          href={(() => {
            searchParams.set(pageName, totalPages.toString())

            return `${pathname}?${searchParams.toString()}`
          })()}
        >
          <Last />
        </Link>
      </div>
    </div>
  )
}

export default QueryParamsPagination
