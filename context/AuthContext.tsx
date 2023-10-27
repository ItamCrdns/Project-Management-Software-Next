'use client'
import { type PropsWithChildren, createContext, useContext, useState, useEffect } from 'react'
import authenticateEmployee, { type CredentialsType } from '@/api-calls/authenticateEmployee'
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
}

interface UserContextType {
  user: LoginData | Employee
  setUser: React.Dispatch<React.SetStateAction<LoginData | Employee>>
  handleLogin: (credentials: CredentialsType) => Promise<LoginData | null>
}

const initialState: UserContextType = {
  user: {
    employeeId: 0,
    username: '',
    role: '',
    profilePicture: '',
    supervisor: null,
    company: null,
    projectTotalCount: 0,
    projectsParticipant: 0,
    projectsCreated: 0,
    taskTotalCount: 0,
    tasksCreated: 0,
    tasksParticipant: 0,
    issueTotalCount: 0,
    issuesParticipant: 0,
    issuesCreated: 0,
    tier: {
      tierId: 0,
      name: '',
      duty: '',
      created: ''
    }
  },
  setUser: () => {},
  handleLogin: async (credentials: CredentialsType) => {
    return null
  }
}

const AuthContext = createContext<UserContextType>(initialState)

/**
 * Provides authentication context for the application.
 * @param children The child components to be wrapped by the provider.
 * @returns The authentication provider component.
 */

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<LoginData | Employee>(initialState.user)

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('user') as string)
    if (dataFromLocalStorage !== null) {
      setUser(JSON.parse(localStorage.getItem('user') as string))
    }
  }, [])

  /**
   * Authenticates the employee with the given credentials.
   * @param credentials The login credentials of the employee.
   * @returns The login data of the authenticated employee.
   */

  const handleLogin = async (credentials: CredentialsType): Promise<LoginData | null> => {
    const auth = await authenticateEmployee(credentials)
    const userData: LoginData = await auth.data

    if (auth.status === 200) {
      const loginData = userData
      setUser(loginData.employee)
      window.localStorage.setItem('user', JSON.stringify(userData.employee))
    }

    return userData
  }

  return (
    <AuthContext.Provider value={{ handleLogin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext)
  if (context === null) {
    return initialState
  }
  return context
}
