import styles from './queryparamspag.module.css'
import { handleInputClick } from './handleInputClick'
import { type PaginationUIProps } from './IPaginationUIProps'
// import Search from '../search/search'

const PaginationUI: React.FC<PaginationUIProps> = (props) => {
  const {
    currentPageSize,
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
    handlePageSizeInputChange
  } = props.entityProps

  // const { secondEntity } = props.secondEntityProps

  const pageSize =
    currentPageSize > totalEntitesCount ? totalEntitesCount : currentPageSize

  // const secondEntityPageSizeValue =
  //   props.secondEntityTotalCount > props.secondEntityTotalPages
  //     ? props.secondEntityTotalCount
  //     : props.secondEntityTotalPages

  return (
    <div className={styles.pagination}>
      <div className={styles.pagesize}>
        <p>Showing</p>
        <input
          type='number'
          value={pageSize}
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
            <input type='number' />
            <p>{props.secondEntityProps?.secondEntity.toLowerCase()}</p>
          </div>
      )}
      {/* <Search maxInputLength={255} url={props.url} stateBasedSearch={false} /> */}
      <div className={styles.prevandnextpage}>
        <div>
          <span onClick={goToFirstPage} className='material-symbols-outlined'>
            keyboard_double_arrow_left
          </span>
          <div onClick={goToPreviousPage}>
            <span className='material-symbols-outlined'>navigate_before</span>
            <p className={styles.prevnexttext}>Previous</p>
          </div>
        </div>
        <input
          type='number'
          value={currentPage}
          onClick={handleInputClick}
          onChange={handleCurrentPageInputChange}
        />
        <p>of {totalPages}</p>
        <div>
          <div onClick={goToNextPage}>
            <p className={styles.prevnexttext}>Next</p>
            <span className='material-symbols-outlined'>navigate_next</span>
          </div>
          <span onClick={goToLastPage} className='material-symbols-outlined'>
            keyboard_double_arrow_right
          </span>
        </div>
      </div>
    </div>
  )
}

export default PaginationUI
