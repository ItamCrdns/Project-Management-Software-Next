import styles from './search.module.css'

interface SearchProps {
  onSearch: (e: React.SyntheticEvent) => void
}

const Search = ({ onSearch }: SearchProps): JSX.Element => {
  return (
    <section className={styles.search}>
      <span className="material-symbols-outlined">search</span>
      <input type="text" placeholder='Press enter to search' onChange={onSearch} />
    </section>
  )
}

export default Search
