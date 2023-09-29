'use client'
import { type PropsWithChildren, createContext, useContext, useState } from 'react'
import authenticateEmployee, { type CredentialsType } from '@/app/dashboard/login/authenticateEmployee'

export interface Employee {
  employeeId: number
  username: string
  role: string
  profilePicture: string
}

interface UserContextType {
  user: Employee
  setUser: React.Dispatch<React.SetStateAction<Employee>>
  handleLogin: (credentials: CredentialsType) => Promise<Employee | null>
}

const initialState: UserContextType = {
  user: {
    employeeId: 0,
    username: '',
    role: '',
    profilePicture: ''
  },
  setUser: () => {},
  handleLogin: async (credentials: CredentialsType) => {
    return null
  }
}

const AuthContext = createContext<UserContextType>(initialState)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState(initialState.user)

  const handleLogin = async (credentials: CredentialsType): Promise<Employee | null> => {
    const auth = await authenticateEmployee(credentials)
    const userData: Employee = await auth.data.employee

    if (auth.status === 200) {
      setUser(userData)
      return userData
    }

    return null
  }

  return (
    <AuthContext.Provider value={{ handleLogin, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): UserContextType => useContext(AuthContext)
