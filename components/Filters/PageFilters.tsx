import { useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import { filterInitialState } from './filterInitialState'
import styles from './filters.module.css'

interface IPageFiltersProps {
  toggle: boolean
  showPictures?: boolean
}

export interface IFilter {
  authorIds?: number[]
}

const PageFilters: React.FC<IPageFiltersProps> = (props) => {
  const { toggle } = props

  const [filter, setFilter] = useState<IFilter>(filterInitialState)

  const getAuthorsIDValues = (authorIds: number[]): void => {
    setFilter({ ...filter, authorIds })
  }

  const handleClearFilters = (): void => {
    setFilter(filterInitialState) // * Visually clear the filters
  }

  const filtersHaveBeenSet = filter.authorIds?.length !== 0

  // TODO: Might do a grayish button until the users sets some filters

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor
        toggle={toggle}
        showPictures={props.showPictures}
        getAuthorsIDValues={getAuthorsIDValues}
        clearAuthorsIDValues={!filtersHaveBeenSet} // * Clear the authors Ids if the user clears the filters
      />
      <p>Team</p>
      <p>Priority</p>
      <RippleButton
        text="Apply filters"
        textColor={filtersHaveBeenSet ? 'white' : 'var(--text-color)'}
        backgroundColor={
          filtersHaveBeenSet ? '#00A9FF' : 'var(--darker-banner-color)'
        }
        disabled={!filtersHaveBeenSet}
      />
      {filtersHaveBeenSet && (
        <div style={{ marginTop: '.75rem' }}>
          <RippleButton
            text="Clear filters"
            textColor="var(--text-color)"
            backgroundColor="var(--darker-banner-color)"
            func={handleClearFilters}
          />
        </div>
      )}
    </div>
  )
}

export default PageFilters
