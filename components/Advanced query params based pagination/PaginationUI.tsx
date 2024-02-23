import styles from './queryparamspag.module.css'
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
    <div className={styles.pagination}>
      <div className={styles.pagesize}>
        <p>Showing</p>
        <input
          type='number'
          defaultValue={pageSize}
          onClick={handleInputClick}
          onChange={handlePageSizeInputChange}
        />
        <p>
          of {totalEntitesCount} {entityName.toLowerCase()}
        </p>
      </div>
      {props.secondEntityProps?.secondEntity !== undefined &&
        props.secondEntityProps?.secondEntity !== '' && (
          <div className={styles.pagesize}>
            <p>Showing</p>
            <input
              type='number'
              defaultValue={secondPageSize}
              onClick={handleInputClick}
              onChange={handleSecondPageSizeInputChange}
            />
            <p>{props.secondEntityProps?.secondEntity.toLowerCase()}</p>
          </div>
      )}
      <div className={styles.prevandnextpage}>
        <div>
          <svg
            onClick={currentPage > 1 ? goToFirstPage : () => {}}
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
          <div onClick={goToPreviousPage}>
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
              className={styles.prevnexttext}
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
        />
        <p>of {totalPages}</p>
        <div>
          <div onClick={totalPages > 1 ? goToNextPage : () => {}}>
            <p
              className={styles.prevnexttext}
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
            onClick={totalPages > 1 ? goToLastPage : () => {}}
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
