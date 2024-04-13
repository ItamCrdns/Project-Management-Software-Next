'use client'
import { Button } from '@/components/Button/Button'
import { SearchByName } from '@/components/Filters/SearchByName'
import { SelectPriority } from '@/components/Filters/SelectPriority'
import { useFilters } from '@/components/Filters/hooks/useFilters'
import { useGetSearchParams } from '@/components/Filters/useGetSearchParams'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const Filters: React.FC = () => {
  const { searchParams } = useGetSearchParams()

  const searchFilterSet =
    searchParams.get('searchValue') !== null &&
    searchParams.get('searchValue') !== ''

  const filtersHaveBeenSet = searchFilterSet

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

  return (
    <div className='flex flex-col items-center p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-[300px]'>
      <div className='flex flex-col gap-4 p-4'>
        <SearchByName />
        <SelectPriority {...selectPriorityProps} />
      </div>
      {filtersHaveBeenSet && (
        <div className='w-full'>
          <Button text='Clear all filters' />
        </div>
      )}
    </div>
  )
}

export { Filters }
