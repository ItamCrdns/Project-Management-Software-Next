'use client'
import { useAuth } from '@/context/AuthContext'
import { type Employee } from '@/interfaces/employee'

const UserPage = (): JSX.Element => {
  const { user } = useAuth()

  const employee = user as Employee

  return <h1>Welcome, <span>{employee.username}</span></h1>
}

export default UserPage
