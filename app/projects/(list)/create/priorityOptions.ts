import { type Option } from '@/interfaces/props/CustomSelectProps'

export const priorityOptions: Option[] = [
  { value: 1, label: 'Low', info: 'Low priority tasks are not time-sensitive and can be done later.' },
  { value: 2, label: 'Moderate', info: 'Moderate priority tasks should be completed within a few days.' },
  { value: 3, label: 'Normal', info: 'Normal priority tasks require attention within 24 hours.' },
  { value: 4, label: 'High', info: 'High priority tasks are urgent and should be done within a few hours.' },
  { value: 5, label: 'Urgent', info: 'Urgent priority tasks require immediate action and should be done right away.' }
]
