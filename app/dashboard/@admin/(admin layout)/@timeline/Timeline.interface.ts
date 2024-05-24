import { Issue } from '@/interfaces/Issue'
import { Employee } from '@/interfaces/employee'
import { Project } from '@/interfaces/project'
import { Task } from '@/interfaces/task'

export type TimelineType =
  | 'Login'
  | 'Logout'
  | 'Update'
  | 'Delete'
  | 'Create'
  | 'Register'
  | 'Assign'
  | 'Unassign'
  | 'Start'
  | 'Finish'
  | 'Cancel'
  | 'Report'

export interface Timeline {
  timelineId: number
  event: string
  eventText: string
  created: string
  type: TimelineType
  employee: Employee
  project: Project
  task: Task
  issue: Issue
}
