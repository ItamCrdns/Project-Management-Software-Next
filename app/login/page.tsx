'use client'
import { Button } from '@/components/Button/Button'
import { TextInput } from '@tremor/react'
import { login } from './actions/login'
import { debounce } from '@/utility/debouce'
import { CompanyLogo } from './CompanyLogo'
import Link from 'next/link'
import { useFormState } from '@/hooks/useFormState'

const LoginPage: React.FC<{ searchParams: { username?: string } }> = (props) => {
  const { username } = props.searchParams
  const {
    formRef,
    message,
    handleSetMessage,
    btnClicked,
    handleSetBtnClicked,
    handleClick
  } = useFormState()

  return (
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-8 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-500'>
        <CompanyLogo />
        <div>
          <h1 className='text-lg font-semibold'>Sign in to your account</h1>
          <h1 className='text-sm flex gap-2'>
            Dont have an account?{' '}
            <span className='text-azure-radiance-600'>Sign up</span>
          </h1>
        </div>
        <form
          ref={formRef}
          action={debounce((formData: FormData) => {
            void (async (formData: FormData) => {
              const response = await login(formData)
              if (response !== undefined) {
                handleSetMessage(response)
                handleSetBtnClicked(false)
              }
            })(formData)
          }, 500)}
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
              error={
                message.type === 'client' &&
                (message.message === 'UsernameError' ||
                  message.message === 'BothError')
              }
              errorMessage='Please enter a username'
              defaultValue={username ?? ''}
            />
          </div>
          <div>
            <p className='text-sm font-semibold mb-2'>Password</p>
            <TextInput
              name='password'
              type='password'
              placeholder='Password'
              required
              error={
                message.type === 'client' &&
                (message.message === 'PasswordError' ||
                  message.message === 'BothError')
              }
              errorMessage='Please enter a password'
            />
          </div>
          <input type='submit' className='hidden' />
        </form>
        <div
          className='w-full'
          onClick={() => {
            handleSetBtnClicked(true)
          }}
        >
          <Button text='Login' func={handleClick} loading={btnClicked} />
        </div>
        <div className='-my-4'>
          {message.type === 'server' && (
            <p className='text-red-500 text-center'>{message.message}</p>
          )}
        </div>
        <p className='text-sm flex gap-2'>
          Forgot your password?{' '}
          <Link href={'/forgotpassword'} className='text-azure-radiance-600'>
            Reset password
          </Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
