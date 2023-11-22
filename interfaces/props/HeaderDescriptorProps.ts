import { type SortValues } from '@/app/dashboard/@admin/@projects/sortValues'
import { type IFilter, type IFilterProperties } from './context props/IFilter'
import { type SearchParamsPageSize } from './ClientNameProps'

export interface Style {
  width: string
}

export interface HeaderDescriptorProps {
  dashboard: boolean
  width: string
  entity: string // ? Will now use a hardcoded string to know which entity is the header descriptor for
  updateFilter?: (key: keyof IFilter, props: IFilterProperties) => void // ! Currently nullable,
  sortValues: SortValues
  pushSearchParams?: boolean // Track if the filters should be pushed to the url
  url?: string
  searchParams?: SearchParamsPageSize
}
