
import { type HeaderItem } from '../Data Header/headerItems'
import { Calendar } from '@/icons/Calendar'
import { Chart } from '@/icons/Chart'
import { Users } from '@/icons/Users'
import { Flag } from '@/icons/Flag'
import { NameTag } from '@/icons/NameTag'

export const employeeHeaderItems: HeaderItem[] = [
  {
    icon: NameTag,
    label: 'Username',
    sortValue: 'username'
  },
  { icon: Calendar, label: 'Last login', sortValue: 'lastlogin' },
  { icon: Flag, label: 'Position', sortValue: 'tier' },
  { icon: Users, label: 'Duties', sortValue: 'tier' },
  { icon: Chart, label: 'Workload', sortValue: 'workload' }
]
