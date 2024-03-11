'use client'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { useParams } from 'next/navigation'
import { SelectAuthor } from './SelectAuthor'
import { SelectPriority } from './SelectPriority'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { type IParams } from './SelectAuthorInterfaces'
import { employeesAsOptions } from './employeesAsOptions'
import { useGetSearchParams } from './useGetSearchParams'
import { useEmployeeFilterUtility, type EmployeeFetcherProps } from '@/hooks/useEmployeeFilterUtility '

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC = () => {
  const { router, pathname, searchParams } = useGetSearchParams()

  const clearFilters = (): void => {
    searchParams.delete('author')
    searchParams.delete('priority')

    router.replace(`${pathname}?${searchParams.toString()}`)

    setSelectedPriority(null)
    clearSelectedEmployees()
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

  const employeesFromUrl = searchParams.get('author')?.split('-')

  const [currentPage, setCurrentPage] = useState<number>(1)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const params: IParams = useParams()
  const employeeFetcherProps: EmployeeFetcherProps = {
    ids: employeesFromUrl,
    shouldFetch: true,
    clientId: Number(params.client?.[0]),
    page: currentPage.toString(),
    limit: '3'
  }

  const {
    selectedEmployees,
    allEmployees,
    onEmployeeSelect,
    clearSelectedEmployees
  } = useEmployeeFilterUtility(employeeFetcherProps)

  const [selectedPriority, setSelectedPriority] = useState<Option | null>(null)

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

  return (
    <div className='flex flex-col gap-4'>
      <SelectAuthor {...selectAuthorProps} />
      <SelectPriority {...selectPriorityProps} />
      {filtersHaveBeenSet && (
        <div className='w-full'>
          <Button text='Clear all filters' func={clearFilters} />
        </div>
      )}
    </div>
  )
}

export { PageFilters }
