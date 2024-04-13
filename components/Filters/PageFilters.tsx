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
import { useFilters } from './hooks/useFilters'

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC<PageFiltersProps> = (props) => {
  const { router, pathname, searchParams } = useGetSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    selectedPriority,
    activeDropdown,
    handleClearSelectedPriority,
    handleSetActiveDropdown,
    handleClearActiveDropdown,
    handleSetSelectedPriority
  } = useFilters()

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
    searchParams.delete('searchValue')

    router.replace(`${pathname}?${searchParams.toString()}`)

    handleClearSelectedPriority()
    clearSelectedEmployees()
  }

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const selectAuthorProps = {
    shouldShowDropdown: activeDropdown === 'author',
    onShowDropdown: () => {
      handleSetActiveDropdown('author')
    },
    closeDropdown: () => {
      handleClearActiveDropdown()
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
      handleSetActiveDropdown('priority')
    },
    closeDropdown: () => {
      handleClearActiveDropdown()
    },
    clearFilters,
    selectedPriority,
    onPrioritySelect: (priority: Option | Option[] | null): void => {
      handleSetSelectedPriority(priority)
    }
  }

  const authorIdFilterSet =
    searchParams.get('author') !== null &&
    searchParams.get('author')?.length !== 0

  const priorityFilterSet =
    searchParams.get('priority') !== null &&
    searchParams.get('priority') !== '0'

  const searchFilterSet =
    searchParams.get('searchValue') !== null &&
    searchParams.get('searchValue') !== ''
  // * Track if the clear filters button should be shown or not
  const filtersHaveBeenSet =
    authorIdFilterSet || priorityFilterSet || searchFilterSet

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
