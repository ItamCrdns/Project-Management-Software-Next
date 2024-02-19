import { type CredentialsType } from '@/api-calls/authenticateEmployee'
import { employeeInitialState, type Employee } from '@/interfaces/employee'

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
}

export interface UserContextType {
  user: Employee | null
  setUser: React.Dispatch<React.SetStateAction<Employee | null>>
  handleLogin: (credentials: CredentialsType) => Promise<LoginData | null>
}

export const initialState: UserContextType = {
  user: employeeInitialState,
  setUser: () => {},
  handleLogin: async (credentials: CredentialsType) => {
    return null
  }
}
