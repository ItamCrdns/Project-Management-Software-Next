import { type IFilter } from '@/interfaces/props/context props/IFilter'
import styles from './pagesize.module.css'
import React from 'react'

interface PageSizeSelectorProps {
  filter: IFilter
  entitiesCount: number
  handlePageSizeChange: (e: React.MouseEvent<HTMLDivElement>) => void
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = (props) => {
  const { filter, entitiesCount, handlePageSizeChange } = props

  const pageSizeOptions = ['5', '10', '15', '20']

  return (
    <>
      <p>Limit:</p>
      <div className={styles.pagesizewrapper}>
        <div className={styles.pagesizedots} onClick={handlePageSizeChange}>
          {pageSizeOptions.map((pageSize) => (
            <span
              key={pageSize}
              style={{
                backgroundColor:
                  filter.projects.pageSize === pageSize
                    ? 'rgb(255, 80, 120)'
                    : ''
              }}
              className={styles.dot}
            >
              {pageSize}
            </span>
          ))}
          <p>of {entitiesCount}</p>
        </div>
      </div>
    </>
  )
}

export default PageSizeSelector
