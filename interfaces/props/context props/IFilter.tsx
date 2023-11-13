export interface IFilterProperties {
  page?: string
  pageSize?: string
  sort?: string
  orderBy?: string
}

export interface IFilter {
  projects: IFilterProperties
  tasks: IFilterProperties
  issues: IFilterProperties
}
