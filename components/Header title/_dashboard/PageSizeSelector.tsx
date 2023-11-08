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
  return (
    <div className={styles.pagesizewrapper}>
      <p>Limit:</p>
      <div className={styles.pagesizedots} onClick={handlePageSizeChange}>
        <span
          style={{
            backgroundColor: filter.pageSize === '5' ? 'rgb(255, 80, 120)' : ''
          }}
          className={styles.dot}
        >
          5
        </span>
        <span
          style={{
            backgroundColor:
              filter.pageSize === '10' ? 'rgb(255, 80, 120)' : ''
          }}
          className={styles.dot}
        >
          10
        </span>
        <span
          style={{
            backgroundColor:
              filter.pageSize === '15' ? 'rgb(255, 80, 120)' : ''
          }}
          className={styles.dot}
        >
          15
        </span>
        {entitiesCount > 0 && (
          <span
            style={{
              backgroundColor:
                filter.pageSize === entitiesCount.toString()
                  ? 'rgb(255, 80, 120)'
                  : ''
            }}
            className={styles.dot}
          >
            {entitiesCount}
          </span>
        )}
      </div>
    </div>
  )
}

export default PageSizeSelector
