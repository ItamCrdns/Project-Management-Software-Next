import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlass } from '@/svg/MagnifyingGlass'
import { TextInput } from '@tremor/react'

interface SearchProps {
  maxInputLength: number
  url?: string
  onInputChange?: (arg0: boolean) => void
  stateBasedSearch: boolean // ? Disable the router.push for components that will not use searchParams based search and will instead rely on state based search
  stateBasedGetInputValue?: (input: string) => void // ? Used to get the input value from the search component and pass it to the parent component
}

const Search: React.FunctionComponent<SearchProps> = ({
  maxInputLength,
  onInputChange,
  url,
  stateBasedSearch,
  stateBasedGetInputValue
}) => {
  const searchParams = useSearchParams()
  const searchValueFromParams = searchParams.get('search')

  const [searchTerm, setSearchTerm] = useState<string>(
    searchValueFromParams ?? ''
  )
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const router = useRouter()
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm !== '' && !stateBasedSearch) {
        router.push(`${url}&search=${searchTerm}`)
      }
      if (stateBasedSearch) {
        stateBasedGetInputValue?.(searchTerm)
      }
      setShowSpinner(false)
    }, 1000)

    // debounce/delay the search until the user stops typing by clearing the timeout
    return () => {
      clearTimeout(delaySearch)
    }
  }, [searchTerm, stateBasedSearch, stateBasedGetInputValue, router, url])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setShowSpinner(true)
    setSearchTerm(value)
    onInputChange?.(true)
    setTimeout(() => {
      onInputChange?.(false) // Use optional chaining to safely invoke onInputChange
    }, 1000)
  }

  useEffect(() => {
    if (searchValueFromParams !== null && searchValueFromParams !== undefined) {
      setSearchTerm(searchValueFromParams)
    }
  }, [searchValueFromParams])

  return (
    <section className='relative flex justify-center items-center'>
      <div className='absolute left-4 select-none z-999'>
        <MagnifyingGlass />
      </div>
      <TextInput
        type='text'
        placeholder='Press enter to search'
        defaultValue={searchValueFromParams ?? ''}
        maxLength={maxInputLength}
        onChange={handleInputChange}
        className='w-full h-10 pl-12 pr-4'
      />
      {showSpinner && (
        <span className='absolute right-4 h-4 w-4 animate-spin-fast rounded-full border-t-2 border-theming-dark100 dark:border-theming-white100'></span>
      )}
    </section>
  )
}

export default Search
