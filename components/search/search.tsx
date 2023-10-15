import { useEffect, useState } from 'react'
import styles from './search.module.css'

interface SearchProps {
  maxInputLength: number
  onSearch: (arg0: string) => void
}

/**
 * Renders a search component with an input field and a search icon.
 * @param {Object} props - The component props.
 * @param {number} props.maxInputLength - The maximum length of the input field.
 * @param {Function} props.onSearch - The function to be called when the input value changes.
 * @returns {JSX.Element} - The rendered search component.
 */

const Search = ({ maxInputLength, onSearch }: SearchProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm)
    }, 1000)

    // debounce/delay the search until the user stops typing by clearing the timeout
    return () => { clearTimeout(delaySearch) }
  }, [searchTerm, onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSearchTerm(value)
  }

  return (
    <section className={styles.search}>
      <span className="material-symbols-outlined">search</span>
      <input
        type="text"
        placeholder="Press enter to search"
        maxLength={maxInputLength}
        onChange={handleInputChange}
      />
    </section>
  )
}

export default Search
