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
