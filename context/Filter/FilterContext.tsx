'use client'
import { type FilterContextType } from '@/interfaces/props/context props/FilterContextType'
import { type IFilterProperties, type IFilter } from '@/interfaces/props/context props/IFilter'
import { createContext, useState } from 'react'
import { filterInitialState } from './filterInitialState'
import { type IEntity } from '@/interfaces/props/context props/IEntity'
import { entityInitialState } from './entityInitialState'

export const FilterContext = createContext<FilterContextType | null>(null)

const FilterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState<IFilter>(filterInitialState)
  const [entity, setEntity] = useState<IEntity>(entityInitialState)

  const updateFilter = (key: keyof IFilter, props: Partial<IFilterProperties>): void => {
    setFilter((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], ...props }
    }))
  }

  console.log(filter)

  const clearFilter = (): void => {
    setFilter(filterInitialState)
  }

  const updateEntity = (key: keyof IEntity, props: IEntity): void => {
    setEntity((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], ...props }
    }))
  }

  return (
    <FilterContext.Provider
      value={{ filter, updateFilter, clearFilter, entity, updateEntity }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
