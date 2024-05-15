'use client'
import Search from '../search/search'
import { useGetSearchParams } from './useGetSearchParams'

const SearchByName: React.FC = () => {
  const { searchParams } = useGetSearchParams()

  // * Avoid search param duplication
  const paramsWithoutSearch = new URLSearchParams(searchParams.toString())
  paramsWithoutSearch.delete('searchValue')

  return (
    <Search
      maxInputLength={255}
      stateBasedSearch={false}
      searchPlaceholder='Search by project name'
      paramName='searchValue'
    />
  )
}

export { SearchByName }
