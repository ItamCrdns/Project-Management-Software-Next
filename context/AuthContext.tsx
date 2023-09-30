'use client'
import { type PropsWithChildren, createContext, useContext, useState } from 'react'
import authenticateEmployee, { type CredentialsType } from '@/app/dashboard/login/authenticateEmployee'

export interface Employee {
  employeeId: number
  username: string
  role: string
  profilePicture: string
}

export interface LoginData {
  authenticated: boolean
  message: string
  employee: Employee
  status: number
}

interface UserContextType {
  user: LoginData | Employee
  setUser: React.Dispatch<React.SetStateAction<LoginData | Employee>>
  handleLogin: (credentials: CredentialsType) => Promise<LoginData | null>
}

const initialState: UserContextType = {
  user: JSON.parse(window.localStorage.getItem('user') as string) ?? null,
  setUser: () => {},
  handleLogin: async (credentials: CredentialsType) => {
    return null
  }
}

const AuthContext = createContext<UserContextType>(initialState)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<LoginData | Employee>(initialState.user)

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
