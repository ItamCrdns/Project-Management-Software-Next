import { type Sort } from '@/interfaces/props/context props/IFilter'

const defaultSortValue: Sort = 'descending'

const validValues: Sort[] = ['ascending', 'descending']

const checkAndSetSort = (value: string): Sort => {
  const lowercaseValidValue: string[] = validValues.map((value: Sort) => value.toLowerCase())

  if (lowercaseValidValue.includes(value as Sort)) {
    return value as Sort
  }

  return defaultSortValue
}

export default checkAndSetSort
