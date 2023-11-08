import {
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'

export const filterProperties: IFilterProperties = {
  alpabetical: '',
  date: '',
  priority: '',
  status: '',
  currentPage: '1',
  pageSize: '5'
}

export const filterInitialState: IFilter = {
  projects: filterProperties,
  tasks: filterProperties,
  issues: filterProperties
}
