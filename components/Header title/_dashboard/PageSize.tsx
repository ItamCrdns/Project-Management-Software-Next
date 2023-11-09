'use client'
import { FilterContext } from '@/context/Filter/FilterContext'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import { useContext } from 'react'
import PageSizeSelector from './PageSizeSelector'
import { type IFilter } from '@/interfaces/props/context props/IFilter'

interface PageSizeProps {
  entity: keyof IFilter
}

const PageSize: React.FC<PageSizeProps> = (props) => {
  const { filter, updateFilter, entity } = useContext(
    FilterContext
  ) as FilterContextType

  const handlePageSizeChange = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target instanceof HTMLSpanElement) {
      const value = e.target.innerText
      const newFilter = { pageSize: value } // ? Pass the filter too to avoid typeScript error
      updateFilter(props.entity, newFilter)
    }
  }

  const entitiesCount = entity[props.entity]?.count // * Get the total count of the entity we are currently seeing

  return (
    <PageSizeSelector
      filter={filter}
      entitiesCount={entitiesCount}
      handlePageSizeChange={handlePageSizeChange}
    />
  )
}

export default PageSize
