import { type Option } from '@/interfaces/props/CustomSelectProps'

const options: Option[] = [
  { value: 1, label: 'Company', info: 'A-Z' },
  { value: 2, label: 'Priority', info: 'Lowest to highest' },
  { value: 3, label: 'Created date', info: 'Oldest to newest' },
  { value: 4, label: 'Creator', info: 'Creator' }
  // { value: 1, label: 'Alphabetical', info: 'A-Z' },
  // { value: 2, label: 'Alphabetical', info: 'Z-A' },
  // { value: 3, label: 'Date', info: 'Oldest to newest' },
  // { value: 4, label: 'Date', info: 'Newest to oldest' },
  // { value: 5, label: 'Priority', info: 'Lowest to highest' },
  // { value: 6, label: 'Priority', info: 'Highest to lowest' },
  // { value: 7, label: 'Status', info: 'Completed' },
  // { value: 8, label: 'Status', info: 'In progress' },
  // { value: 9, label: 'Status', info: 'Not started' }
]

export default options
