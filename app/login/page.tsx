'use client'
import { useRef, useState } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { Button } from '@/components/Button/Button'
import { TextInput } from '@tremor/react'
import { login } from './actions/login'

const LoginPage: React.FC = () => {
  const formRef = useRef(null)

  const [message, setMessage] = useState<string>('')

  const handleClick = useSubmitRef(formRef)

  return (
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-8 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-500'>
        <div className='flex gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z'
            />
          </svg>
          <p className='font-bold text-sm'>ACME Corporation</p>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>Sign in to your account</h1>
          <h1 className='text-sm flex gap-2'>
            Dont have an account?{' '}
            <span className='text-azure-radiance-600'>Sign up</span>
          </h1>
        </div>
        <form
          ref={formRef}
          action={(formData: FormData) => {
            void (async (formData: FormData) => {
              const response = await login(formData)
              if (response !== undefined && response !== '') {
                setMessage(response)
              }
            })(formData)
          }}
          className='flex flex-col gap-4'
        >
          <div>
            <p className='text-sm font-semibold mb-2'>Username</p>
            <TextInput
              name='username'
              type='text'
              placeholder='Username'
              autoFocus
              required
            />
          </div>
          <div>
            <p className='text-sm font-semibold mb-2'>Password</p>
            <TextInput
              name='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <input type='submit' className='hidden' />
        </form>
        <div className='w-full'>
          <Button text='Login' func={handleClick} />
        </div>
        {message !== '' && (
          <p className='text-red-500 text-center'>{message}</p>
        )}
        <p className='text-sm flex gap-2'>
          Forgot your password?{' '}
          <span className='text-azure-radiance-600'>Reset password</span>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
