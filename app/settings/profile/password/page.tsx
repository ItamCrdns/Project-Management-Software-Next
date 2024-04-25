import { getLatestPasswordVerification } from '@/api-calls/getLatestPasswordVerification'
import { redirect } from 'next/navigation'
import { ChangePasswordInputs } from './ChangePasswordInputs'

const ChangePassword: React.FC = async () => {
  const { data } = await getLatestPasswordVerification()

  if (data?.success === false) {
    redirect('/settings/profile')
  }

  return (
    <>
      <div className='border-b border-gray-200 dark:border-gray-800 pb-4'>
        <h1 className='font-semibold'>Change password</h1>
        <p className='opacity-50 text-sm w-[750px]'>
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters. Although it&apos;s not
          necessary, it&apos;s recommended to include at least one upper case
          letter, one lower case letter, one number and one special character.
        </p>
      </div>
      <ChangePasswordInputs />
    </>
  )
}

export default ChangePassword
