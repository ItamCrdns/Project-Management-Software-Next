import { type Employee } from '@/interfaces/employee'

export interface Position {
  // ? Use rem or px
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export interface EmployeeListProps {
  employee: Employee
  size: number // Size in px for the image should be provided only one: ex: 25x25 or 50x50
  redirectMe: boolean // * Should we redirect to the employee profile or not? prop drilling
  position?: Position
}
