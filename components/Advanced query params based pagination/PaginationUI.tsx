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
          <span onClick={goToFirstPage} className='material-symbols-outlined'>
            keyboard_double_arrow_left
          </span>
          <div onClick={goToPreviousPage}>
            <span className='material-symbols-outlined'>navigate_before</span>
            <p
              className={styles.prevnexttext}
              style={{ color: totalPages <= 1 || currentPage === 1 ? 'gray' : '' }}
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
              style={{ color: totalPages <= 1 || totalPages === currentPage ? 'gray' : '' }}
            >
              Next
            </p>
            <span className='material-symbols-outlined'>navigate_next</span>
          </div>
          <span
            onClick={totalPages > 1 ? goToLastPage : () => {}}
            className='material-symbols-outlined'
          >
            keyboard_double_arrow_right
          </span>
        </div>
      </div>
    </div>
  )
}

export default PaginationUI
