import { type Option } from '@/interfaces/props/CustomSelectProps'

/**
 * Array of options for sorting.
 */
const options: Option[] = [
  { value: 1, label: 'Alphabetical', info: 'A-Z' },
  { value: 2, label: 'Date', info: 'Oldest to newest' },
  { value: 3, label: 'Date', info: 'Newest to oldest' },
  { value: 4, label: 'Priority', info: 'Lowest to highest' },
  { value: 5, label: 'Priority', info: 'Highest to lowest' },
  { value: 6, label: 'Status', info: 'Completed' },
  { value: 7, label: 'Status', info: 'In progress' },
  { value: 8, label: 'Status', info: 'Not started' }
]

export default options
