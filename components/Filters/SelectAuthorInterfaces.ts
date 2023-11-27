import { type Employee } from '@/interfaces/employee'

export interface ISharedProps {
  clearValues: boolean
  defaultSectedValues: string
  shouldShowDropdown: boolean
  onShowDropdown: () => void
  resetActiveDropdown: () => void
}

export interface ISelectAuthorProps extends ISharedProps {
  toggle: boolean
  showPictures?: boolean
  getAuthorsIDValues: (values: number[]) => void
  employeesPictures: string[]
  defaultEmployees: Employee[] | undefined
}

export interface IParams {
  client?: [string, string]
}
