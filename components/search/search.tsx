'use client'
import { MagnifyingGlass } from '@/icons/MagnifyingGlass'
import { TextInput } from '@tremor/react'
import { useGetSearchParams } from '../Filters/useGetSearchParams'
import { debounce } from '@/utility/debouce'
import { useEffect, useRef } from 'react'

interface SearchProps {
  maxInputLength: number
  stateBasedSearch: boolean // ? Disable the router.push for components that will not use searchParams based search and will instead rely on state based search
  stateBasedGetInputValue?: (input: string) => void // ? Used to get the input value from the search component and pass it to the parent component
  searchPlaceholder?: string
  paramName?: string
  resetPageOnSearch?: boolean
}

const Search: React.FC<SearchProps> = (props) => {
  const {
    maxInputLength,
    stateBasedSearch,
    stateBasedGetInputValue,
    searchPlaceholder,
    paramName,
    resetPageOnSearch = true
  } = props

  const { router, pathname, searchParams } = useGetSearchParams()

  const searchParam = 'searchValue'

  const handleSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value: inputValue } = e.target

      if (inputValue !== '' && !stateBasedSearch) {
        searchParams.set(searchParam, inputValue)
        if (resetPageOnSearch) {
          searchParams.set('page', '1')
        }

        router.push(`${pathname}?${searchParams.toString()}`)
      } else if (inputValue === '' && !stateBasedSearch) {
        router.push(pathname)
      } else if (stateBasedSearch) {
        stateBasedGetInputValue?.(inputValue)
      }
    },
    1000
  )

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Need to use this alternative because defaultValue doesnt get updated after the first render
    if (inputRef.current !== null) {
      inputRef.current.value = searchParams.get(searchParam) ?? ''
    }
  }, [searchParams.get(paramName as string)])

  return (
    <div className='relative flex justify-center items-center'>
      <div className='absolute left-4 select-none z-999'>
        <MagnifyingGlass />
      </div>
      <TextInput
        type='text'
        ref={inputRef}
        placeholder={searchPlaceholder ?? 'Press enter to search'}
        maxLength={maxInputLength}
        onChange={handleSearch}
        className='w-full h-10 pl-12 pr-4'
      />
    </div>
  )
}

export default Search
