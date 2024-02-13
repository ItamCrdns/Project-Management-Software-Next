import { type SortValues } from '@/components/Data Header/sortValues'
import { type IFilter, type IFilterProperties } from './context props/IFilter'

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
