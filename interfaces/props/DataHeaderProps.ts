import { type SortValues } from '@/components/Data Header/sortValues'
import { type ComponentType } from 'react'

export interface Style {
  width: string
}

export interface DataHeaderProps {
  pushSearchParams: boolean
  width: string
  entity?: string // ? Will now use a hardcoded string to know which entity is the header descriptor for
  sortValues: SortValues
}

export interface HeaderItemProps {
  style: Style
  icon: ComponentType
  label: string
  sortValue?: string
  searchParams: URLSearchParams
  pushSearchParams: boolean
  currentPath?: string
}
