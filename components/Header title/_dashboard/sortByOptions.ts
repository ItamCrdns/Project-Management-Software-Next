import { type Option } from '@/interfaces/props/CustomSelectProps'

/**
 * Array of options for sorting.
 */
const options: Option[] = [
  { value: 1, label: 'Alphabetical', info: 'A-Z' },
  { value: 2, label: 'Ascending', info: 'Oldest to newest' },
  { value: 3, label: 'Descending', info: 'Newest to oldest' }
]

export default options
