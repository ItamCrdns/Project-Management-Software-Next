import { CompanyLogo } from '@/app/login/CompanyLogo'
import { Button } from '@/components/Button/Button'

const TokenExpired: React.FC<{ email?: string }> = (props) => {
  const { email } = props

  return (
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-8 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-500'>
        <CompanyLogo />
        <div>
          <h1 className='text-lg font-semibold'>Reset your password</h1>
          <h1 className='text-sm flex gap-2'>
            The token has expired. Please request a new one.
          </h1>
        </div>
        <div className='w-full'>
          <Button
            text='Request new token'
            href={
              email !== undefined
                ? `/forgotpassword?email=${email}`
                : '/forgotpassword'
            }
          />
        </div>
      </section>
    </main>
  )
}

export { TokenExpired }
