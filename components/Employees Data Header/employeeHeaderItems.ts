import { Icon } from '@/svg/Icon'
import { type HeaderItem } from '../Data Header/headerItems'
import { Calendar } from '@/svg/Calendar'
import { Chart } from '@/svg/Chart'
import { Users } from '@/svg/Users'
import { Flag } from '@/svg/Flag'

export const employeeHeaderItems: HeaderItem[] = [
  {
    icon: Icon,
    label: 'Username',
    sortValue: 'username'
  },
  { icon: Calendar, label: 'Last login', sortValue: 'lastlogin' },
  { icon: Chart, label: 'Position', sortValue: 'position' },
  { icon: Users, label: 'Duties', sortValue: 'duties' },
  { icon: Flag, label: 'Workload', sortValue: 'workload' }
]
