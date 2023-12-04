import React, { useCallback, useEffect, useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import { filterInitialState } from './filterInitialState'
import styles from './filters.module.css'
import SelectPriority from './SelectPriority'
import { setInitialSearchParams } from './setInitialSearchParams'
import { usePathname, useRouter } from 'next/navigation'
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'
import { type Employee } from '@/interfaces/employee'

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
      if (authorIds.length === 0) return
      searchParams.set('author', authorIds.join('-'))
      searchParams.set('pagesize', '10')

      if (searchParams.toString() !== undefined && authorIds.length !== 0) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
      setFilter({ ...filter, authorIds })
    },
    [filter]
  )

  const getPriorityValue = useCallback(
    (priority: number) => {
      if (priority === 0) return
      searchParams.set('priority', priority.toString())
      searchParams.set('pagesize', '10')

      if (searchParams.toString() !== undefined && priority !== 0) {
        router.replace(`${pathname}?${searchParams.toString()}`)
      }
      setFilter({ ...filter, priority })
    },
    [filter]
  )

  const handleClearFilters = (): void => {
    // * Visually clear the filters
    setFilter(filterInitialState)

    // * Clear the URL query params
    searchParams.delete('author')
    searchParams.delete('priority')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const handleClearPriority = (): void => {
    searchParams.delete('priority')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)

    setFilter({ ...filter, priority: 0 })
  }

  const handleClearAuthors = (): void => {
    searchParams.delete('author')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)

    setFilter({ ...filter, authorIds: [] })
  }

  const searchParams = setInitialSearchParams()

  const setFiltersFromUrl = useCallback(
    (authorIds: number[], priority: number): void => {
      setFilter({ ...filter, authorIds, priority })
    },
    [filter, searchParams]
  )

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // * If any of the query params its provided, set the filter state
    if (searchParams.has('author') || searchParams.has('priority')) {
      const dontRepeatIds = Array.from(
        new Set(searchParams.get('author')?.split('-'))
      )
      const dontRepeatIdsNumber = dontRepeatIds.map((i) => parseInt(i))

      const priority = parseInt(searchParams.get('priority') ?? '0')
      setFiltersFromUrl(dontRepeatIdsNumber, priority)
    } else {
      setFiltersFromUrl([], 0)
      setEmployeesPictures([])
    }
  }, [searchParams])

  const { employeesFromIds } = getEmployeesByIdsArray(
    filter.authorIds ?? [],
    filter.authorIds?.length !== 0
  )

  const [employeeIds, setEmployeeIds] = useState<Employee[]>([])

  useEffect(() => {
    if (employeesFromIds !== undefined) {
      setEmployeeIds(employeesFromIds)
    }

    if (filter.authorIds?.length === 0) {
      setEmployeeIds([])
    }
  }, [employeesFromIds])

  useEffect(() => {
    if (employeeIds !== undefined) {
      const pictures = employeeIds?.map((e) => e.profilePicture) ?? []
      setEmployeesPictures(pictures)
    }
  }, [employeeIds])

  const [employeesPictures, setEmployeesPictures] = useState<string[]>([])

  const [activeDropdown, setActiveDropdown] = useState<string>('')

  const onShowDropdown = (dropdown: string): void => {
    // * If the dropdown is already active, reset it
    if (dropdown === activeDropdown) {
      setActiveDropdown('')
      return
    }

    setActiveDropdown(dropdown)
  }

  const authorIdFilterSet = filter.authorIds?.length !== 0
  const priorityFilterSet = filter.priority !== 0

  // * This boolean will be used to track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor
        showPictures={props.showPictures}
        getAuthorsIDValues={getAuthorsIDValues}
        clearValues={!authorIdFilterSet} // * If not set, clear. Same for priority
        employeesPictures={employeesPictures}
        defaultEmployees={employeeIds}
        defaultSectedValues={filter.authorIds as number[]}
        shouldShowDropdown={activeDropdown === 'author'}
        onShowDropdown={() => {
          onShowDropdown('author')
        }}
        resetActiveDropdown={() => {
          setActiveDropdown('')
        }}
        clearSelectedOptionsFunction={handleClearAuthors}
      />
      <SelectPriority
        getPriorityValue={getPriorityValue}
        clearValues={!priorityFilterSet}
        defaultSectedValues={filter.priority as number}
        shouldShowDropdown={activeDropdown === 'priority'}
        onShowDropdown={() => {
          onShowDropdown('priority')
        }}
        resetActiveDropdown={() => {
          setActiveDropdown('')
        }}
        clearSelectedOptionsFunction={handleClearPriority}
      />
      {filtersHaveBeenSet && (
        <div style={{ marginTop: '.75rem' }}>
          <RippleButton
            text='Clear all filters'
            textColor='white'
            backgroundColor='rgb(255, 80, 120)'
            func={handleClearFilters}
          />
        </div>
      )}
    </div>
  )
}

export default PageFilters
