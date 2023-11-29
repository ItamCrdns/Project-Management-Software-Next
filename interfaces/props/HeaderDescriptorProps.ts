import { type SortValues } from '@/app/dashboard/@admin/@projects/sortValues'
import { type IFilter, type IFilterProperties } from './context props/IFilter'

export interface Style {
  width: string
}

export interface HeaderDescriptorProps {
  dashboard: boolean
  pushSearchParams: boolean
  width: string
  entity: string // ? Will now use a hardcoded string to know which entity is the header descriptor for
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void // ! Currently nullable,
  sortValues: SortValues
}
