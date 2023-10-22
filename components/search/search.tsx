import { useEffect, useState } from 'react'
import styles from './search.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchProps {
  maxInputLength: number
  url?: string
  onInputChange: (arg0: boolean) => void
}

const Search: React.FunctionComponent<SearchProps> = ({
  maxInputLength,
  onInputChange,
  url
}) => {
  const searchParams = useSearchParams()
  const searchValueFromParams = searchParams.get('search')

  const [searchTerm, setSearchTerm] = useState<string>(searchValueFromParams ?? '')
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const router = useRouter()
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm !== '') {
        router.push(`${url}&search=${searchTerm}`)
      }
      setShowSpinner(false)
    }, 1000)

    // debounce/delay the search until the user stops typing by clearing the timeout
    return () => {
      clearTimeout(delaySearch)
    }
  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setShowSpinner(true)
    setSearchTerm(value)
    onInputChange(true)
    setTimeout(() => {
      onInputChange(false)
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
        type="text"
        placeholder="Press enter to search"
        defaultValue={searchValueFromParams ?? ''}
        maxLength={maxInputLength}
        onChange={handleInputChange}
      />
      {showSpinner && <span className={styles.loader} />}
    </section>
  )
}

export default Search
