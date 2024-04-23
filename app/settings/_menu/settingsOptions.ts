interface ISettingOption {
  name: string
  path: string
  index: number
}

export const settingsOptions: ISettingOption[] = [
  {
    name: 'Basic',
    path: '/settings/basic',
    index: 1
  },
  {
    name: 'Profile',
    path: '/settings/profile',
    index: 2
  },
  {
    name: 'Appearance',
    path: '/settings/appearance',
    index: 3
  },
  {
    name: 'Notifications',
    path: '/settings/notifications',
    index: 4
  },
  {
    name: 'Security',
    path: '/settings/security',
    index: 5
  }
]
