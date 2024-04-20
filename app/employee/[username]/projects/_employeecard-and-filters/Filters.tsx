'use client'
import { Button } from '@/components/Button/Button'
import { SearchByName } from '@/components/Filters/SearchByName'
import { SelectPriority } from '@/components/Filters/SelectPriority'
import { useFilters } from '@/components/Filters/hooks/useFilters'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const Filters: React.FC = () => {
  const { router, pathname, searchParams } = useGetSearchParams()

  const {
    selectedPriority,
    activeDropdown,
    handleSetSelectedPriority,
    handleSetActiveDropdown,
    handleClearActiveDropdown,
    handleClearSelectedPriority
  } = useFilters()

  const selectPriorityProps = {
    defaultValue: searchParams.get('priority') ?? '',
    shouldShowDropdown: activeDropdown === 'priority',
    onShowDropdown: () => {
      handleSetActiveDropdown('priority')
    },
    closeDropdown: () => {
      handleClearActiveDropdown()
    },
    clearFilters: () => {
      handleClearSelectedPriority()
    },
    selectedPriority,
    onPrioritySelect: (priority: Option | Option[] | null): void => {
      handleSetSelectedPriority(priority)
    }
  }

  const clearFilters = (): void => {
    searchParams.delete('searchValue')
    searchParams.delete('priority')

    router.replace(`${pathname}?${searchParams.toString()}`)

    handleClearSelectedPriority()
  }

  const searchFilterSet =
    searchParams.get('searchValue') !== null &&
    searchParams.get('searchValue') !== ''

  const priorityFilterSet =
    searchParams.get('priority') !== null &&
    searchParams.get('priority') !== '0'

  const filtersHaveBeenSet = searchFilterSet || priorityFilterSet

  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-[300px]'>
      <div className='flex flex-col gap-4 p-4'>
        <SearchByName />
        <SelectPriority {...selectPriorityProps} />
        {filtersHaveBeenSet && (
          <div className='w-full'>
            <Button text='Clear all filters' func={clearFilters} />
          </div>
        )}
      </div>
    </div>
  )
}

export { Filters }
