'use client'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import { useContext } from 'react'
import PageSizeSelector from './PageSizeSelector'

const PageSize: React.FC = () => {
  const { filter, updateFilter, entity } = useContext(
    FilterContext
  ) as FilterContextType

  const handlePageSizeChange = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target instanceof HTMLSpanElement) {
      const value = e.target.innerText
      const newFilter = { ...filter, pageSize: value }
      updateFilter(newFilter)
    }
  }

  return (
    <PageSizeSelector
      filter={filter}
      entitiesCount={entity.count}
      handlePageSizeChange={handlePageSizeChange}
    />
  )
}

export default PageSize
