import { useState } from 'react'
import RippleButton from '../ripplebutton/RippleButton'
import SelectAuthor from './SelectAuthor'
import styles from './filters.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getEmployeesByIdsArray } from '@/api-calls/getEmployeesByIdsArray'
import SelectPriority from './SelectPriority'

interface IPageFiltersProps {
  showPictures?: boolean
}

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC<IPageFiltersProps> = (props) => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

  const { employeesFromIds } = getEmployeesByIdsArray(
    searchParams
      .get('author')
      ?.split('-')
      .map((i) => Number(i)) ?? [],
    searchParams.get('author') !== undefined &&
      searchParams.get('author') !== ''
  )

  const getAuthorsIDValues = (authorIds: number[]): void => {
    if (authorIds.length === 0) {
      handleClearAuthors()
    }

    searchParams.set('author', authorIds.join('-'))
    searchParams.set('pagesize', '10')

    if (searchParams.toString() !== undefined && authorIds.length !== 0) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const getPriorityValue = (priority: number): void => {
    if (priority === 0) return
    searchParams.set('priority', priority.toString())
    searchParams.set('pagesize', '10')

    if (searchParams.toString() !== undefined && priority !== 0) {
      router.replace(`${pathname}?${searchParams.toString()}`)
    }
  }

  const handleClearFilters = (): void => {
    searchParams.delete('author')
    searchParams.delete('priority')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const handleClearPriority = (): void => {
    searchParams.delete('priority')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const handleClearAuthors = (): void => {
    searchParams.delete('author')
    searchParams.set('pagesize', '10')

    router.replace(`${pathname}?${searchParams.toString()}`)
  }

  const [activeDropdown, setActiveDropdown] = useState<string>('')

  const onShowDropdown = (dropdown: string): void => {
    // * If the dropdown is already active, reset it
    if (dropdown === activeDropdown) {
      setActiveDropdown('')
      return
    }

    setActiveDropdown(dropdown)
  }

  const authorIdFilterSet =
    searchParams.get('author') !== null &&
    searchParams.get('author')?.length !== 0
  const priorityFilterSet =
    searchParams.get('priority') !== null &&
    searchParams.get('priority') !== '0'

  // * Track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  const selectAuthorProps = {
    showPictures: props.showPictures,
    getAuthorsIDValues,
    clearValues: !authorIdFilterSet, // * If not set, clear. Same for priority
    employeesPictures: employeesFromIds?.map((e) => e.profilePicture) ?? [],
    defaultEmployees: employeesFromIds,
    defaultSelectedValues:
      searchParams
        .get('author')
        ?.split('-')
        .map((i) => Number(i)) ?? [],
    shouldShowDropdown: activeDropdown === 'author',
    onShowDropdown: () => {
      onShowDropdown('author')
    },
    resetActiveDropdown: () => {
      setActiveDropdown('')
    },
    clearSelectedOptionsFunction: handleClearAuthors
  }

  const selectPriorityProps = {
    getPriorityValue,
    clearValues: !priorityFilterSet,
    defaultSelectedValues: Number(searchParams.get('priority')),
    shouldShowDropdown: activeDropdown === 'priority',
    onShowDropdown: () => {
      onShowDropdown('priority')
    },
    resetActiveDropdown: () => {
      setActiveDropdown('')
    },
    clearSelectedOptionsFunction: handleClearPriority
  }

  return (
    <div className={styles.filterwrapper}>
      <SelectAuthor {...selectAuthorProps} />
      <SelectPriority {...selectPriorityProps} />
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
