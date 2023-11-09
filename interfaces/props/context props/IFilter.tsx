export interface IFilterProperties {
  alpabetical?: string
  date?: string
  priority?: string
  status?: string
  currentPage?: string
  pageSize?: string
}

export interface IFilter {
  projects: IFilterProperties
  tasks: IFilterProperties
  issues: IFilterProperties
}
