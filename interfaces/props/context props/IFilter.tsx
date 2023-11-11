import { type Order } from '@/context/Filter/filterInitialState'

export interface IFilterProperties {
  alpabetical?: string
  date?: string
  priority?: string
  status?: string
  currentPage?: string
  pageSize?: string
  // ? For sorting
  sortBy?: string
  order?: Order
}

export interface IFilter {
  projects: IFilterProperties
  tasks: IFilterProperties
  issues: IFilterProperties
}
