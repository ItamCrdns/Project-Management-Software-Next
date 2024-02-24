'use client'
import { useAuth } from '@/context/AuthContext'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Alert from '@/components/alert/alert'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { type Result, type LoginData } from '@/context/authInitialState'
import { Button } from '@/components/Button/Button'

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
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-4 p-8 rounded-xl shadow-md bg-theming-white100 dark:bg-theming-dark100'>
        <h1 className='text-center'>Company Logo here</h1>
        <form ref={formRef} onSubmit={handleSubmit} className='flex gap-6'>
          <input
            type='text'
            name='username'
            required
            placeholder='Username'
            className='p-4 w-52 h-5 rounded-2xl focus:outline-none focus:ring-2 bg-theming-white100 text-black'
            autoFocus
          />
          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            className='p-4 w-52 h-5 rounded-2xl focus:outline-none focus:ring-2 bg-theming-white100 text-black'
          />
          <input type='submit' className='hidden' />
        </form>
        <div className='flex self-center'>
          <Button text='Login' func={handleClick} />
        </div>
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
