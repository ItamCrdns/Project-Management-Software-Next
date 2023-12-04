import styles from './queryparamspag.module.css'
import { handleInputClick } from './handleInputClick'
import { type PaginationUIProps } from './IPaginationUIProps'
// import Search from '../search/search'

const PaginationUI: React.FC<PaginationUIProps> = (props) => {
  const { handleCurrentPageInputChange, handlePageSizeInputChange } = props

  const pageSizeValue = props.currentPageSize > props.totalEntitesCount ? props.totalEntitesCount : props.currentPageSize

  return (
    <div className={styles.pagination}>
      <div className={styles.pagesize}>
        <p>Showing</p>
        <input
          type='number'
          value={pageSizeValue}
          onClick={handleInputClick}
          onChange={handlePageSizeInputChange}
        />
        <p>
          of {props.totalEntitesCount} {props.entityName.toLowerCase()}
        </p>
      </div>
      {/* <Search maxInputLength={255} url={props.url} stateBasedSearch={false} /> */}
      <div className={styles.prevandnextpage}>
        <div>
          <span
            onClick={props.goToFirstPage}
            className='material-symbols-outlined'
          >
            keyboard_double_arrow_left
          </span>
          <div onClick={props.goToPreviousPage}>
            <span className='material-symbols-outlined'>navigate_before</span>
            <p className={styles.prevnexttext}>Previous</p>
          </div>
        </div>
        <input
          type='number'
          value={props.currentPage}
          onClick={handleInputClick}
          onChange={handleCurrentPageInputChange}
        />
        <p>of {props.totalPages}</p>
        <div>
          <div onClick={props.goToNextPage}>
            <p className={styles.prevnexttext}>Next</p>
            <span className='material-symbols-outlined'>navigate_next</span>
          </div>
          <span
            onClick={props.goToLastPage}
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
