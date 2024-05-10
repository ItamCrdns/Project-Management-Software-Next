import { handleInputClick } from './handleInputClick'
import { type PaginationUIProps } from './IPaginationUIProps'

const PaginationUI: React.FC<PaginationUIProps> = (props) => {
  const {
    currentPageSize,
    currentSecondEntityPageSize,
    currentPage,
    totalEntitesCount,
    totalPages,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage
  } = props.paginationProps

  const {
    entityName,
    handleCurrentPageInputChange,
    handlePageSizeInputChange,
    handleSecondPageSizeInputChange
  } = props.entityProps

  const pageSize =
    currentPageSize > totalEntitesCount ? totalEntitesCount : currentPageSize

  const secondPageSize =
    (currentSecondEntityPageSize ?? 0) >
    (props.secondEntityProps?.secondEntityTotalCount ?? 0)
      ? props.secondEntityProps?.secondEntityTotalCount
      : currentSecondEntityPageSize

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
        <div className='flex items-center'>
          <svg
            onClick={
              currentPage > 1
                ? goToFirstPage
                : () => {
                    /* Do nothing */
                  }
            }
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
            />
          </svg>
          <div className='flex items-center' onClick={goToPreviousPage}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
            <p
              className='text-azure-radiance-600 font-semibold cursor-pointer select-none'
              style={{
                color: totalPages <= 1 || currentPage === 1 ? 'gray' : ''
              }}
            >
              Previous
            </p>
          </div>
        </div>
        <input
          type='number'
          value={currentPage}
          onClick={handleInputClick}
          onChange={handleCurrentPageInputChange}
          disabled={totalPages === 1}
          className='text-center w-10 border-0 outline-0 p-2 rounded-md text-black dark:text-white focus:outline-none focus:ring-2 bg-theming-white200 dark:bg-theming-dark200'
        />
        <p>of {totalPages}</p>
        <div className='flex items-center'>
          <div
            className='flex items-center'
            onClick={
              totalPages > 1
                ? goToNextPage
                : () => {
                    /* Do nothing */
                  }
            }
          >
            <p
              className='text-azure-radiance-600 font-semibold cursor-pointer select-none'
              style={{
                color:
                  totalPages <= 1 || totalPages === currentPage ? 'gray' : ''
              }}
            >
              Next
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer ml-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </div>
          <svg
            onClick={
              totalPages > 1
                ? goToLastPage
                : () => {
                    /* Do nothing */
                  }
            }
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default PaginationUI
