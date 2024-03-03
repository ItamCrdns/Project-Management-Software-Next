import { type Employee } from '@/interfaces/employee'
import { type Option } from '@/interfaces/props/CustomSelectProps'

export const employeesAsOptions = (employees: Employee[]): Option[] =>
  employees.map((x) => ({
    value: x.employeeId,
    label: x.username,
    info: '',
    picture: x.profilePicture
  }))
