'use client'
import { useAuth, type Employee } from '@/context/AuthContext'
import { useState } from 'react'

const LoginPage = (): JSX.Element => {
  const { handleLogin } = useAuth()

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const credentials = {
      creds: formData
    }

    handleLogin(credentials)
      .then((data) => {
        setEmployee(data)
        setError(null)
      })
      .catch((err) => {
        setEmployee(null)
        setError(err.message)
      })
  }

  return (
    <>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" required />
        <input type="password" name="password" />
        <input type="submit" />
        {employee !== null && <p>{employee.username} logged in successfully!</p>}
        {error !== null ? <p>{error}</p> : null}
      </form>
    </>
  )
}

export default LoginPage
