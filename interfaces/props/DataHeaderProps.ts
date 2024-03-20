import { type SortValues } from '@/components/Data Header/sortValues'
import { type IFilter, type IFilterProperties } from './context props/IFilter'
import { type ComponentType } from 'react'
import { type Order } from '@/context/Filter/filterInitialState'

export interface Style {
  width: string
}

export interface DataHeaderProps {
  dashboard: boolean
  pushSearchParams: boolean
  width: string
  entity?: string // ? Will now use a hardcoded string to know which entity is the header descriptor for
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void // ! Currently nullable,
  sortValues: SortValues
}

export interface HeaderItemProps {
  style: Style
  handleSortChange: (orderBy: string) => void
  icon: ComponentType
  order: Order
  label: string
  sortValue: string | undefined
  searchParams: URLSearchParams
  dashboard: boolean
  pushSearchParams: boolean
  currentPath?: string
}
