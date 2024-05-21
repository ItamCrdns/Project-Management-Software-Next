import { type ITab } from '@/components/Tabs/ITab.interface'

export const adminTabs: ITab[] = [
  {
    name: 'Overview',
    path: '/dashboard',
    index: 1
  },
  {
    name: 'Your employees',
    path: '/dashboard/employees',
    index: 2
  },
  {
    name: 'Teams',
    path: '/dashboard/teams',
    index: 3
  },
  {
    name: 'Work to do',
    path: '/dashboard/to-do',
    index: 4
  }
]
