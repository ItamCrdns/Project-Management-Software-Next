export interface SortValues {
  name: string
  creator: string
  team: string
  priority?: string
  created: string
  company?: string
  project?: string
  task?: string
}

export const projectSortValues: SortValues = {
  name: 'Name',
  creator: 'ProjectCreator',
  team: 'Employees',
  priority: 'Priority',
  created: 'Created',
  company: 'Company',
  project: 'Project',
  task: 'Task'
}

export const taskSortValues: SortValues = {
  name: 'Name',
  creator: 'TaskCreator',
  team: 'Employees',
  priority: 'Priority',
  created: 'Created',
  company: 'Company',
  project: 'Project',
  task: 'Task'
}

export const issueSortValues: SortValues = {
  name: 'Name',
  creator: 'IssueCreator',
  team: 'Employees',
  priority: 'Priority',
  created: 'Created',
  company: 'Company',
  project: 'Project',
  task: 'Task'
}
