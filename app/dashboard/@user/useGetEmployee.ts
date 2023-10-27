'use client'
import { type Employee } from '@/interfaces/employee'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import getEmployeeClient from '@/api-calls/getEmployeeClient'

export interface Return {
  employee: Employee | null
  error: string
}

const useGetEmployee = (): Return => {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const userFromLocalStorage = user as Employee

  useEffect(() => {
    if (
      userFromLocalStorage.username !== '' &&
      userFromLocalStorage.username !== null
    ) {
      getEmployeeClient(userFromLocalStorage.username)
        .then((res) => {
          setEmployee(res.data)
        })
        .catch((error) => {
          setError(error.message)
        })
    }
  }, [user])

  return { employee: employee ?? null, error: error ?? '' }
}

export default useGetEmployee
