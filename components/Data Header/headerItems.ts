import { type ComponentType } from 'react'
import { type SortValues } from './sortValues'
import { Creator } from '@/icons/Creator'
import { Users } from '@/icons/Users'
import { Priority } from '@/icons/Priority'
import { Calendar } from '@/icons/Calendar'
import { Client } from '@/icons/Client'
import { Project } from '@/icons/Project'
import { Task } from '@/icons/Task'
import { NameTag } from '@/icons/NameTag'

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
    icon: NameTag,
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
