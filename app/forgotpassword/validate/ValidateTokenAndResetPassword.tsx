'use client'
import { CompanyLogo } from '@/app/login/CompanyLogo'
import { useState } from 'react'
import { ValidateTokenForm } from './ValidateTokenForm'
import { ResetPassword } from './ResetPassword'

const ValidateTokenAndResetPassword: React.FC<{ request: string, email?: string }> = (
  props
) => {
  const [verifiedToken, setVerifiedToken] = useState<string>('')

  const handleSetVerifiedToken = (token: string): void => {
    setVerifiedToken(token)
  }

  return (
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-8 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-500'>
        <CompanyLogo />
        <div>
          <h1 className='text-lg font-semibold'>Reset your password</h1>
          <h1 className='text-sm flex gap-2'>
            {verifiedToken === ''
              ? 'Enter the code sent to your email'
              : 'Enter a new password. Your new password must be different from previous used passwords.'}
          </h1>
        </div>
        {verifiedToken === ''
          ? (
          <ValidateTokenForm
            request={props.request}
            handleSetVerifiedToken={handleSetVerifiedToken}
          />
            )
          : (
          <ResetPassword token={verifiedToken} email={props.email} />
            )}
      </section>
    </main>
  )
}

export { ValidateTokenAndResetPassword }
