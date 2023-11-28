import { type Employee } from '@/interfaces/employee'

export interface ISharedProps {
  clearValues: boolean
  // * Can we both. To handle selected authors (array of numbers) and selected priority (number)
  // * Use type assertion when passing them as props
  defaultSectedValues: number[] | number
  shouldShowDropdown: boolean
  onShowDropdown: () => void
  resetActiveDropdown: () => void
  clearSelectedOptionsFunction: () => void
}

export interface ISelectAuthorProps extends ISharedProps {
  showPictures?: boolean
  getAuthorsIDValues: (values: number[]) => void
  employeesPictures: string[]
  defaultEmployees: Employee[] | undefined
}

export interface IParams {
  client?: [string, string]
}
