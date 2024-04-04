import Search from '../search/search'
import { useGetSearchParams } from './useGetSearchParams'

const SearchByName: React.FC = () => {
  const { pathname, searchParams } = useGetSearchParams()

  // * Avoid search param duplication
  const paramsWithoutSearch = new URLSearchParams(searchParams.toString())
  paramsWithoutSearch.delete('search')

  return (
    <Search
      maxInputLength={255}
      url={`${pathname}?${paramsWithoutSearch.toString()}`}
      stateBasedSearch={false}
      searchPlaceholder='Search by project name'
    />
  )
}

export { SearchByName }
