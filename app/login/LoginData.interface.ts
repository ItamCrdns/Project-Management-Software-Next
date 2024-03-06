import { type Employee } from '@/interfaces/employee'

export interface Result {
  wrongCreds: boolean | null
  blocked: boolean | null
  somethingWrong: boolean | null
  authenticated: boolean | null
  doesntExist: boolean | null
}

export interface LoginData {
  result: Result
  message: string
  employee: Employee
  token: string
}
