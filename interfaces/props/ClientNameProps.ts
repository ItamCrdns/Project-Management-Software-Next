import { type SearchParams } from '../searchParams'
import { type OrderBy, type Sort } from './context props/IFilter'

export interface SearchParamsPageSize extends SearchParams {
  pagesize: string
  orderby: OrderBy
  sort: Sort
  author: string
  priority: string
  secondpagesize?: string
}

export interface ClientNameProps {
  params: {
    client: string[]
  }
  searchParams: SearchParamsPageSize
}
