// import { useState } from 'react'
import { MagnifyingGlass } from '@/svg/MagnifyingGlass'
import { TextInput } from '@tremor/react'
import { useGetSearchParams } from '../Filters/useGetSearchParams'
import { debounce } from '@/utility/debouce'

interface SearchProps {
  maxInputLength: number
  url?: string
  onInputChange?: (arg0: boolean) => void // ! Revisit
  stateBasedSearch: boolean // ? Disable the router.push for components that will not use searchParams based search and will instead rely on state based search
  stateBasedGetInputValue?: (input: string) => void // ? Used to get the input value from the search component and pass it to the parent component
  searchPlaceholder?: string
  paramName?: string
}

const Search: React.FC<SearchProps> = (props) => {
  const {
    maxInputLength,
    // onInputChange,
    url,
    stateBasedSearch,
    stateBasedGetInputValue,
    searchPlaceholder,
    paramName
  } = props

  const { router, searchParams } = useGetSearchParams()

  const searchParam = paramName ?? 'search'

  const searchValueFromParams = searchParams.get(paramName as string)

  // const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const handleSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value: inputValue } = e.target

      if (url === undefined) {
        return
      }

      if (inputValue !== '' && !stateBasedSearch) {
        router.push(`${url}&${searchParam}=${inputValue}`)
      } else if (inputValue === '' && !stateBasedSearch) {
        router.push(url)
      } else if (stateBasedSearch) {
        stateBasedGetInputValue?.(inputValue)
      }
    },
    1000
  )

  return (
    <section className='relative flex justify-center items-center'>
      <div className='absolute left-4 select-none z-999'>
        <MagnifyingGlass />
      </div>
      <TextInput
        type='text'
        placeholder={searchPlaceholder ?? 'Press enter to search'}
        defaultValue={searchValueFromParams ?? ''}
        maxLength={maxInputLength}
        onChange={handleSearch}
        className='w-full h-10 pl-12 pr-4'
      />
      {/* {showSpinner && (
        <span className='absolute right-4 h-4 w-4 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
      )} */}
    </section>
  )
}

export default Search
