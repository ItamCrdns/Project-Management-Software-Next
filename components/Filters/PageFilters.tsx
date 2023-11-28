import React, { useCallback, useEffect, useRef, useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import { filterInitialState } from './filterInitialState'
import styles from './filters.module.css'
import SelectPriority from './SelectPriority'
import { setInitialSearchParams } from './setInitialSearchParams'
import { usePathname, useRouter } from 'next/navigation'
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'

// TODO: Lots of re-rendering going on here. Might need to refactor this component

interface IPageFiltersProps {
  showPictures?: boolean
}

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC<IPageFiltersProps> = (props) => {
  const [filter, setFilter] = useState<IFilter>(filterInitialState)

  const getAuthorsIDValues = useCallback(
    (authorIds: number[]): void => {
      setFilter({ ...filter, authorIds })
    },
    [filter]
  )

  const getPriorityValue = (priority: number): void => {
    setFilter({ ...filter, priority })
  }

  const handleClearFilters = (): void => {
    setFilter(filterInitialState) // * Visually clear the filters
  }

  const handleClearPriority = (): void => {
    setFilter({ ...filter, priority: 0 })
  }

  const handleClearAuthors = (): void => {
    setFilter({ ...filter, authorIds: [] })
  }

  const authorIdFilterSet = filter.authorIds?.length !== 0
  const priorityFilterSet = filter.priority !== 0

  // * This boolean will be used to track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  const searchParams = setInitialSearchParams()

  const pathname = usePathname()
  const router = useRouter()

  const setFiltersFromUrl = useCallback(
    (authorIds: number[], priority: number): void => {
      setFilter({ ...filter, authorIds, priority })
    },
    [filter, searchParams]
  )

  // ! Only executes once when the URL changes. No need to optimize this
  useEffect(() => {
    // * If any of the query params its provided, set the filter state
    if (searchParams.has('author') || searchParams.has('priority')) {
      const authorIds = searchParams.get('author')?.split('-')
      const dontRepeatIds = Array.from(new Set(authorIds))
      const dontRepeatIdsNumber = dontRepeatIds.map((i) => parseInt(i))

      const priority = parseInt(searchParams.get('priority') ?? '0')
      setFiltersFromUrl(dontRepeatIdsNumber, priority)
    } else {
      setFiltersFromUrl([], 0)
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

  // TODO: Trying to not replace the URL in initial render, but it's not working. If priority and or author are declared, it will replace it with the same URL. Not a big deal, but it's not working as intended
  // ? At least, using useRef it replaces the URL only once instead of two.
  const prevFilter = useRef<IFilter>(filter)

  useEffect(() => {
    const areFiltersEqual =
      prevFilter.current.authorIds?.toString() ===
        filter.authorIds?.toString() &&
      prevFilter.current.priority === filter.priority

    if (!areFiltersEqual) {
      prevFilter.current = { ...filter }

      // * Replace the URL, based on the filter state
      const priorityString = filter.priority?.toString() ?? '0'
      const selectedEmployeesString = filter.authorIds?.join('-')

      searchParams.set('priority', priorityString)
      searchParams.set('author', selectedEmployeesString as string)

      // * Delete query params if the state that handles them is empty
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
    }
  }, [filter, searchParams])

  const [activeDropdown, setActiveDropdown] = useState<string>('')

  const resetActiveDropdown = (): void => {
    setActiveDropdown('')
  }

  const onShowDropdown = (dropdown: string): void => {
    // * If the dropdown is already active, reset it
    if (dropdown === activeDropdown) {
      resetActiveDropdown()
      return
    }

    setActiveDropdown(dropdown)
  }

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor
        showPictures={props.showPictures}
        getAuthorsIDValues={getAuthorsIDValues}
        clearValues={!authorIdFilterSet} // * If not set, clear. Same for priority
        employeesPictures={employeesPictures}
        defaultEmployees={employeesFromIds}
        defaultSectedValues={filter.authorIds as number[]}
        shouldShowDropdown={activeDropdown === 'author'}
        onShowDropdown={() => {
          onShowDropdown('author')
        }}
        resetActiveDropdown={resetActiveDropdown}
        clearSelectedOptions={handleClearAuthors}
      />
      <SelectPriority
        getPriorityValue={getPriorityValue}
        clearValues={!priorityFilterSet}
        defaultSectedValues={filter.priority as number}
        shouldShowDropdown={activeDropdown === 'priority'}
        onShowDropdown={() => {
          onShowDropdown('priority')
        }}
        resetActiveDropdown={resetActiveDropdown}
        clearSelectedOptions={handleClearPriority}
      />
      {filtersHaveBeenSet && (
        <div style={{ marginTop: '.75rem' }}>
          <RippleButton
            text="Clear all filters"
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
