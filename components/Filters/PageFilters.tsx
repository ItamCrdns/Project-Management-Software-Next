'use client'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SelectAuthor from './SelectAuthor'
import SelectPriority from './SelectPriority'

export interface IFilter {
  authorIds?: number[]
  priority?: number
}

const PageFilters: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const nextJsParams = useSearchParams()
  const searchParams = new URLSearchParams(Array.from(nextJsParams.entries()))

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
    shouldShowDropdown: activeDropdown === 'author',
    onShowDropdown: () => {
      onShowDropdown('author')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    }
  }

  const selectPriorityProps = {
    getPriorityValue,
    defaultValue: searchParams.get('priority') ?? '',
    shouldShowDropdown: activeDropdown === 'priority',
    onShowDropdown: () => {
      onShowDropdown('priority')
    },
    closeDropdown: () => {
      setActiveDropdown('')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <SelectAuthor {...selectAuthorProps} />
      <SelectPriority {...selectPriorityProps} />
      {filtersHaveBeenSet && (
        <div className='w-full'>
          <Button text='Clear all filters' func={handleClearFilters} />
        </div>
      )}
    </div>
  )
}

export { PageFilters }
