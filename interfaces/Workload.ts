export interface Workload {
  workloadId: number
  workloadSum?: string
  assignedProjects?: number
  completedProjects?: number
  overdueProjects?: number
  createdProjects?: number
  assignedTasks?: number
  completedTasks?: number
  overdueTasks?: number
  createdTasks?: number
  assignedIssues?: number
  completedIssues?: number
  overdueIssues?: number
  createdIssues?: number
  employee?: number
}
