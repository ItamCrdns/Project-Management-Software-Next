import { type ComponentType } from 'react'
import { type SortValues } from './sortValues'
import { Icon } from '@/svg/Icon'
import { Creator } from '@/svg/Creator'
import { Users } from '@/svg/Users'
import { Priority } from '@/svg/Priority'
import { Calendar } from '@/svg/Calendar'
import { Client } from '@/svg/Client'
import { Project } from '@/svg/Project'
import { Task } from '@/svg/Task'

interface Props {
  entity?: string
  sortValues: SortValues
}

export interface HeaderItem {
  icon: ComponentType
  label: string
  sortValue?: string
}

export const getHeaderItems = (props: Props): HeaderItem[] => [
  {
    icon: Icon,
    label: 'Name',
    sortValue: props.sortValues.name
  },
  { icon: Creator, label: 'Creator', sortValue: props.sortValues.creator },
  { icon: Users, label: 'Team', sortValue: props.sortValues.team },
  ...(props.entity === 'projects' || props.entity === 'projectsfromcompany'
    ? [
        {
          icon: Priority,
          label: 'Priority',
          sortValue: props.sortValues.priority
        }
      ]
    : []),
  {
    icon: Calendar,
    label: 'Created',
    sortValue: props.sortValues.created
  },
  ...(props.entity === 'projects'
    ? [
        {
          icon: Client,
          label: 'Company',
          sortValue: props.sortValues.company
        }
      ]
    : []),
  ...(props.entity === 'tasks'
    ? [
        {
          icon: Project,
          label: 'Project',
          sortValue: props.sortValues.project
        }
      ]
    : []),
  ...(props.entity === 'issues'
    ? [{ icon: Task, label: 'Task', sortValue: props.sortValues.task }]
    : [])
]
