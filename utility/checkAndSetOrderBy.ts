import { type OrderBy } from '@/interfaces/props/context props/IFilter'

const defaultOrderByValue: OrderBy = 'Created'

const validValues: OrderBy[] = [
  'Name',
  'Priority',
  'Created',
  'ProjectCreator',
  'Company',
  'Employees',
  'IssueCreator',
  'Task',
  'TaskCreator',
  'Project',
  'Position',
  'Duties',
  'Workload'
]
/**
 * Checks if the provided value is a valid OrderBy value and returns it if it is.
 * If the provided value is not valid, returns the default OrderBy value.
 * @param value - The value to check against the valid OrderBy values.
 * @returns The provided value if it is a valid OrderBy value, otherwise the default OrderBy value.
 */

const checkAndSetOrderBy = (value: string): OrderBy => {
  const lowercaseValidValue: string[] = validValues.map((value: OrderBy) =>
    value.toLowerCase()
  )

  if (lowercaseValidValue.includes(value as OrderBy)) {
    console.log('futaba sakura', value)
    return value as OrderBy
  }

  return defaultOrderByValue
}

export default checkAndSetOrderBy
