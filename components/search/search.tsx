import { useEffect, useState } from 'react'
import styles from './search.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

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
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 absolute left-4 select-none text-3xl'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
        />
      </svg>
      <input
        type='text'
        placeholder='Press enter to search'
        defaultValue={searchValueFromParams ?? ''}
        maxLength={maxInputLength}
        onChange={handleInputChange}
        className='w-72 h-10 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-theming-primary dark:focus:ring-theming-primary bg-theming-white200 dark:bg-theming-dark300'
      />
      {showSpinner && <span className={styles.loader} />}
    </section>
  )
}

export default Search
