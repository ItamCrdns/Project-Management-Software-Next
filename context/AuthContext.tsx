'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import authenticateEmployee, {
  type CredentialsType
} from '@/api-calls/authenticateEmployee'
import { type Employee } from '@/interfaces/employee'
import {
  type UserContextType,
  type LoginData,
  initialState
} from './authInitialState'
import { getMyEmployeeSWR } from '@/api-calls/getMyEmployeeSWR'

const AuthContext = createContext<UserContextType>(initialState)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [user, setUser] = useState<Employee | null>(null)

  const myEmployee = getMyEmployeeSWR()

  useEffect(() => {
    if (myEmployee !== null) {
      setUser(myEmployee)
    }
  }, [myEmployee])

  const handleLogin = async (
    credentials: CredentialsType
  ): Promise<LoginData | null> => {
    const auth = await authenticateEmployee(credentials)

    if (auth.status === 200) {
      const loginData = auth.data
      setUser(loginData.employee)
    }

    return auth.data
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
