import { CompanyLogo } from '../login/CompanyLogo'
import { Form } from './Form'

const ForgotPassword: React.FC<{ searchParams: { email: string } }> = (props) => {
  const { email } = props.searchParams

  return (
    <main className='flex items-center justify-center mt-8'>
      <section className='flex flex-col justify-center gap-8 p-8 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300 w-500'>
        <CompanyLogo />
        <div>
          <h1 className='text-lg font-semibold'>Reset your password</h1>
          <h1 className='text-sm flex gap-2'>
            Enter your email address below. We will send you a 6-digit code to
            reset your password.
          </h1>
        </div>
        <Form email={email} />
      </section>
    </main>
  )
}

export default ForgotPassword
