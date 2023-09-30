'use client'
import { useAuth, type LoginData } from '@/context/AuthContext'
import styles from './login.module.css'
import { useRef, useState } from 'react'
import Button from '@/components/button/button'
import { useRouter } from 'next/navigation'
import Alert from '@/components/alert/alert'
import { useSubmitRef } from '@/utility/formSubmitRef'

const LoginPage = (): JSX.Element => {
  const router = useRouter()
  const { handleLogin } = useAuth()
  const formRef = useRef(null)

  const [employee, setEmployee] = useState<LoginData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const credentials = {
      creds: formData
    }

    handleLogin(credentials)
      .then((loginData) => {
        console.log(loginData)
        if (loginData?.authenticated !== false) {
          setEmployee(loginData)
          router.push('/dashboard')
        } else if (!loginData?.authenticated) {
          setError(loginData?.message)
        }
      })
      .catch((error) => {
        setError(error)
      })
  }

  const handleClick = useSubmitRef(formRef)

  return (
    <main className={styles.main}>
      <section className={styles.loginwrapper}>
        <h1>Company Logo here</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="username" required placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" />
          {employee?.authenticated !== false && (
            <p>{employee?.employee.username} logged in successfully!</p>
          )}
          {error !== null ? <p>{error}</p> : null}
        </form>
        <div onClick={handleClick}>
          <Button
            text="Login"
            backgroundColor="rgb(0, 210, 255)"
            textColor="white"
          />
        </div>
      </section>
    </main>
  )
}

export default LoginPage
