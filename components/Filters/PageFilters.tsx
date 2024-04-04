'use client'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { SelectAuthor } from './SelectAuthor'
import { SelectPriority } from './SelectPriority'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { employeesAsOptions } from './employeesAsOptions'
import { useGetSearchParams } from './useGetSearchParams'
import { useEmployeeFilterUtility } from '@/hooks/useEmployeeFilterUtility'
import { type PageFiltersProps } from './PageFilters.interface'
import { TeamFilters } from './TeamFilters'
import { SearchByName } from './SearchByName'

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC<PageFiltersProps> = (props) => {
  const { router, pathname, searchParams } = useGetSearchParams()

  const [activeDropdown, setActiveDropdown] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedPriority, setSelectedPriority] = useState<Option | null>(null)

  const queryParamsWithPage = new URLSearchParams(props.queryParams.toString())
  queryParamsWithPage.set('page', currentPage.toString())

  const {
    selectedEmployees,
    allEmployees,
    onEmployeeSelect,
    clearSelectedEmployees
  } = useEmployeeFilterUtility({
    shouldFetch: true,
    url: `${props.url}?${queryParamsWithPage.toString()}`
  })

  const clearFilters = (): void => {
    searchParams.delete('author')
    searchParams.delete('priority')

    router.replace(`${pathname}?${searchParams.toString()}`)

    setSelectedPriority(null)
    clearSelectedEmployees()
  }

  const onShowDropdown = (dropdown: string): void => {
    // * If the dropdown is already active, reset it
    if (dropdown === activeDropdown) {
      setActiveDropdown('')
      return
    }

    setActiveDropdown(dropdown)
  }

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const selectAuthorProps = {
    shouldShowDropdown: activeDropdown === 'author',
    onShowDropdown: () => {
      onShowDropdown('author')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    },
    clearFilters,
    selectedAuthors: employeesAsOptions(selectedEmployees),
    onEmployeeSelect,
    allEmployees,
    selectedEmployees,
    handlePageChange
  }

  const selectPriorityProps = {
    defaultValue: searchParams.get('priority') ?? '',
    shouldShowDropdown: activeDropdown === 'priority',
    onShowDropdown: () => {
      onShowDropdown('priority')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    },
    clearFilters,
    selectedPriority,
    onPrioritySelect: (priority: Option | Option[] | null): void => {
      if (!Array.isArray(priority) && priority !== null) {
        setSelectedPriority(priority)
      }
    }
  }

  const authorIdFilterSet =
    searchParams.get('author') !== null &&
    searchParams.get('author')?.length !== 0
  const priorityFilterSet =
    searchParams.get('priority') !== null &&
    searchParams.get('priority') !== '0'

  // * Track if the clear filters button should be shown or not
  const filtersHaveBeenSet = authorIdFilterSet || priorityFilterSet

  return (
    <div className='flex flex-col gap-4'>
      <SearchByName />
      <SelectAuthor {...selectAuthorProps} />
      <SelectPriority {...selectPriorityProps} />
      <TeamFilters />
      {filtersHaveBeenSet && (
        <div className='w-full'>
          <Button text='Clear all filters' func={clearFilters} />
        </div>
      )}
    </div>
  )
}

export { PageFilters }
