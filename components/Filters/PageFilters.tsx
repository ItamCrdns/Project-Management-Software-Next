import { useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import { filterInitialState } from './filterInitialState'
import styles from './filters.module.css'
import SelectPriority from './SelectPriority'

// TODO: NO MORE THAN ONE SELECT ACTIVE AT THE SAME TIME

interface IPageFiltersProps {
  toggle: boolean
  showPictures?: boolean
}

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC<IPageFiltersProps> = (props) => {
  const { toggle } = props

  const [filter, setFilter] = useState<IFilter>(filterInitialState)

  const getAuthorsIDValues = (authorIds: number[]): void => {
    setFilter({ ...filter, authorIds })
  }

  const getPriorityValue = (priority: number): void => {
    setFilter({ ...filter, priority })
  }

  const handleClearFilters = (): void => {
    setFilter(filterInitialState) // * Visually clear the filters
  }

  const authorIdFilterSet = filter.authorIds?.length !== 0
  const priorityFilterSet = filter.priority !== 0

  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor
        toggle={toggle}
        showPictures={props.showPictures}
        getAuthorsIDValues={getAuthorsIDValues}
        clearAuthorsIDValues={!authorIdFilterSet} // * If not set, clear. Same for priority
      />
      <SelectPriority
        getPriorityValue={getPriorityValue}
        clearPriorityValue={!priorityFilterSet}
      />
      {/* <RippleButton // ?  Might remove this button sicnce all filtering will we made automatically
        text="Apply filters"
        textColor={filtersHaveBeenSet ? 'white' : 'var(--text-color)'}
        backgroundColor={
          filtersHaveBeenSet ? '#00A9FF' : 'var(--darker-banner-color)'
        }
        disabled={!filtersHaveBeenSet}
      /> */}
      {filtersHaveBeenSet && (
        <div style={{ marginTop: '.75rem' }}>
          <RippleButton
            text="Clear filters"
            textColor="white"
            backgroundColor="rgb(255, 80, 120)"
            func={handleClearFilters}
          />
        </div>
      )}
    </div>
  )
}

export default PageFilters
