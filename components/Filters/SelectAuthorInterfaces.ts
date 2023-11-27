import { type Employee } from '@/interfaces/employee'

export interface ISelectAuthorProps {
  toggle: boolean
  showPictures?: boolean
  getAuthorsIDValues: (values: number[]) => void
  clearAuthorsIDValues: boolean // ? Check if the filter.authorIds is empty
  employeesPictures: string[]
  defaultEmployees: Employee[] | undefined
  defaultSelectedOptions: string
}

export interface IParams {
  client?: [string, string]
}
