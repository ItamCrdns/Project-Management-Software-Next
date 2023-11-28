import {
  type IFilterProperties,
  type IFilter,
  type OrderBy,
  type Sort
} from '@/interfaces/props/context props/IFilter'

export interface Order {
  orderBy: OrderBy
  sort: Sort
}

export const orderInitialState: Order = {
  orderBy: 'Created',
  sort: 'descending'
}

export const filterProperties: IFilterProperties = {
  page: '1',
  pageSize: '5',
  orderBy: 'Created',
  sort: 'descending'
}

export const filterInitialState: IFilter = {
  projects: filterProperties,
  tasks: filterProperties,
  issues: filterProperties
}
