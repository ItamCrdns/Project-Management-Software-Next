import { type SortValues } from './sortValues'

interface Props {
  entity?: string
  sortValues: SortValues
}

interface HeaderItem {
  icon: string
  label: string
  sortValue?: string
}

export const getHeaderItems = (props: Props): HeaderItem[] => [
  { icon: 'signature', label: 'Name', sortValue: props.sortValues.name },
  { icon: 'person', label: 'Creator', sortValue: props.sortValues.creator },
  { icon: 'group', label: 'Team', sortValue: props.sortValues.team },
  ...(props.entity === 'projects'
    ? [
        {
          icon: 'priority_high',
          label: 'Priority',
          sortValue: props.sortValues.priority
        }
      ]
    : []),
  {
    icon: 'calendar_month',
    label: 'Created',
    sortValue: props.sortValues.created
  },
  ...(props.entity === 'projects'
    ? [
        {
          icon: 'store',
          label: 'Company',
          sortValue: props.sortValues.company
        }
      ]
    : []),
  ...(props.entity === 'tasks'
    ? [
        {
          icon: 'emoji_objects',
          label: 'Project',
          sortValue: props.sortValues.project
        }
      ]
    : []),
  ...(props.entity === 'issues'
    ? [{ icon: 'note_stack', label: 'Task', sortValue: props.sortValues.task }]
    : [])
]
