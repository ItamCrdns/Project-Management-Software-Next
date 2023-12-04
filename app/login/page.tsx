'use client'
import { useAuth, type LoginData, type Result } from '@/context/AuthContext'
import styles from './login.module.css'
import { useRef, useState } from 'react'
import RippleButton from '@/components/ripplebutton/RippleButton'
import { useRouter } from 'next/navigation'
import Alert from '@/components/alert/alert'
import { useSubmitRef } from '@/utility/formSubmitRef'

const alertInitialState = {
  wrongCreds: false,
  blocked: false,
  somethingWrong: false,
  authenticated: false,
  doesntExist: false
}

const LoginPage = (): JSX.Element => {
  const router = useRouter()
  const { handleLogin } = useAuth()
  const formRef = useRef(null)

  const [message, setMessage] = useState<LoginData | null>(null)
  const [showAlert, setShowAlert] = useState<Result | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const credentials = {
      creds: formData
    }

    handleLogin(credentials)
      .then((loginData) => {
        if (loginData?.result.authenticated !== false) {
          // Succesful login
          router.push('/dashboard')
        } else {
          setMessage(loginData)
          setShowAlert(loginData.result)
          setTimeout(() => {
            setShowAlert(alertInitialState)
          }, 5000)
        }
      })
      .catch((error) => {
        setMessage(error)
      })
  }

  const isAnyFieldTruthy = Object.values(showAlert ?? alertInitialState).some(
    (value) => value
  )

  let alertWidth = '125px'
  let bgColor = ''

  switch (true) {
    case message?.result.blocked:
      alertWidth = '350px'
      bgColor = 'red'
      break
    case message?.result.doesntExist:
      alertWidth = '275px'
      bgColor = '#ff8f00  '
      break
    case message?.result.wrongCreds:
      alertWidth = '350px'
      bgColor = 'red'
      break
  }

  const handleClick = useSubmitRef(formRef)

  return (
    <main className={styles.main}>
      <section className={styles.loginwrapper}>
        <h1>Company Logo here</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            required
            placeholder='Username'
            autoFocus
          />
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
          />
          <input type='submit' />
        </form>
        <RippleButton
          text='Login'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          func={handleClick}
        />
      </section>
      <Alert
        ready={isAnyFieldTruthy}
        message={message?.message ?? ''}
        backgroundColor={bgColor}
        color='white'
        width={alertWidth}
      />
    </main>
  )
}

export default LoginPage
