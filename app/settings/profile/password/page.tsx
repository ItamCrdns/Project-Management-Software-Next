import { Button } from '@/components/Button/Button'
import { TextInput } from '@tremor/react'

const ChangePassword: React.FC = () => {
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
      <div className='w-[300px] space-y-4'>
        <div className='space-y-2 w-[300px]'>
          <h2 className='font-medium'>Current password</h2>
          <TextInput
            name='currentpassword'
            placeholder='Current password'
            type='password'
          />
        </div>
        <div className='space-y-2 w-[300px]'>
          <h2 className='font-medium'>New password</h2>
          <TextInput
            name='newpassword'
            placeholder='New password'
            type='password'
          />
        </div>
        <div className='space-y-2 w-[300px]'>
          <h2 className='font-medium'>Confirm password</h2>
          <TextInput
            name='confirmpassword'
            placeholder='Confirm password'
            type='password'
          />
        </div>
        <div className='pt-4'>
          <Button text='Change password' />
        </div>
      </div>
    </>
  )
}

export default ChangePassword
