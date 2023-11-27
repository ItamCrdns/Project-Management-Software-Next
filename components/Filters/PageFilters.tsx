import { useEffect, useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import { filterInitialState } from './filterInitialState'
import styles from './filters.module.css'
import SelectPriority from './SelectPriority'
import { setInitialSearchParams } from './setInitialSearchParams'
import { usePathname, useRouter } from 'next/navigation'
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'

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

  // * Pass getAuthorsIDValues and getPriorityValue to the select components to take the values from there
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

  // * This boolean will be used to track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  const searchParams = setInitialSearchParams()

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // * If any of the query params its provided, set the filter state
    if (searchParams.has('author') || searchParams.has('priority')) {
      const authorIds = searchParams.get('author')?.split('-')
      const dontRepeatIds = Array.from(new Set(authorIds))
      const dontRepeatIdsNumber = dontRepeatIds.map((i) => parseInt(i))
      const priority = parseInt(searchParams.get('priority') ?? '0')
      setFilter({ ...filter, authorIds: dontRepeatIdsNumber, priority }) // * Cet the selected employees for the URL
    } else {
      setFilter({ ...filter, authorIds: [], priority: 0 })
      setEmployeesPictures([])
    }
  }, [searchParams])

  const shouldFetch = filter.authorIds?.length !== 0

  // * Fetch the employees from the given IDs, return a list of employees with their pictures to show which employees the user has selected
  const { employeesFromIds } = getEmployeesByIdsArray(
    filter.authorIds ?? [],
    shouldFetch
  )

  const [employeesPictures, setEmployeesPictures] = useState<string[]>([])

  useEffect(() => {
    if (employeesFromIds !== undefined) {
      const pictures = employeesFromIds?.map((e) => e.profilePicture) ?? []
      setEmployeesPictures(pictures)
    }
  }, [employeesFromIds])
  // * End of fetching employees from the given IDs

  useEffect(() => {
    // * Replace the URL, based on the filter state
    const priorityString = filter.priority?.toString()
    const selectedEmployeesString = filter.authorIds?.join('-')

    searchParams.set('priority', priorityString as string)
    searchParams.set('author', selectedEmployeesString as string)

    // * Delete query params if the state that handles them is empty
    // TODO: This should fallback to the default query params when making the API call. Currently, will return all priorities and all entiies authors
    if (filter.priority === 0) {
      searchParams.delete('priority')
    }

    if (filter.authorIds?.length === 0) {
      searchParams.delete('author')
    }

    const newUrl = `${pathname}?${searchParams.toString()}`

    if (searchParams.toString() !== undefined) {
      router.replace(newUrl)
    }
  }, [filter])

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor
        toggle={toggle}
        showPictures={props.showPictures}
        getAuthorsIDValues={getAuthorsIDValues}
        clearAuthorsIDValues={!authorIdFilterSet} // * If not set, clear. Same for priority
        employeesPictures={employeesPictures}
        defaultEmployees={employeesFromIds}
        defaultSelectedOptions={searchParams.get('author') as string}
      />
      <SelectPriority
        getPriorityValue={getPriorityValue}
        clearPriorityValue={!priorityFilterSet}
        defaultSelectedPriority={searchParams.get('priority') as string}
      />
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
