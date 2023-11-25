export type Sort = 'ascending' | 'descending'
export type OrderBy =
  | 'Name'
  | 'Priority'
  | 'Created'
  | 'ProjectCreator'
  | 'Company'
  | 'Employees'
  | 'IssueCreator'
  | 'Task'
  | 'TaskCreator'
  | 'Project'

export interface IFilterProperties {
  page?: string
  pageSize?: string
  sort?: Sort
  orderBy?: OrderBy
  author?: string
}

export interface IFilter {
  projects: IFilterProperties
  tasks: IFilterProperties
  issues: IFilterProperties
}
