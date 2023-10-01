'use client'
import { type Employee, useAuth } from '@/context/AuthContext'
import './user.css'

const UserPage = (): JSX.Element => {
  const { user } = useAuth()

  const employee = user as Employee

  return <h1>Welcome, <span>{employee.username}</span></h1>
}

export default UserPage
