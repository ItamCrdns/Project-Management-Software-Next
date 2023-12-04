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

  const [searchTerm, setSearchTerm] = useState<string>(searchValueFromParams ?? '')
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const router = useRouter()
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm !== '' && !stateBasedSearch) {
        // url?.searchParams.set('search', searchTerm)
        // // url?.includes('search')
        // console.log(`${url}&search=${searchTerm}`)
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
    <section className={styles.search}>
      <span className={`${styles.searchicon} material-symbols-outlined`}>
        search
      </span>
      <input
        type='text'
        placeholder='Press enter to search'
        defaultValue={searchValueFromParams ?? ''}
        maxLength={maxInputLength}
        onChange={handleInputChange}
      />
      {showSpinner && <span className={styles.loader} />}
    </section>
  )
}

export default Search
