import {
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'

export interface Order {
  column: string
  order: string
}

export const orderInitialState: Order = {
  column: 'Created',
  order: 'descending'
}

export const filterProperties: IFilterProperties = {
  alpabetical: '',
  date: '',
  priority: '',
  status: '',
  currentPage: '1',
  pageSize: '5',
  sortBy: '',
  order: orderInitialState
}

export const filterInitialState: IFilter = {
  projects: filterProperties,
  tasks: filterProperties,
  issues: filterProperties
}
