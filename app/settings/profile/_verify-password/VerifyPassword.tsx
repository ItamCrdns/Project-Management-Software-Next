'use client'
import { Button } from '@/components/Button/Button'
import { useWarnings } from '@/hooks/useWarnings'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { debounce } from '@/utility/debouce'
import { TextInput } from '@tremor/react'
import { useState } from 'react'
import { confirmPassword } from './actions/confirmPassword'
import { revalidatePasswordTag } from './actions/revalidateTag'
import { useFormState } from '@/hooks/useFormState'

const VerifyPassword: React.FC = () => {
  const [password, setPassword] = useState('') // Might be cool to save the fact that the password is correct through the session so the user doesn't have to re-enter it for lets say 5 minutes

  const { setAlert } = useAlertActions()
  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()
  const { btnClicked, handleSetBtnClicked } = useFormState()

  return (
    <div>
      <h1 className='font-semibold'>Verify your password</h1>
      <p className='opacity-50 text-sm'>Re-enter your password to continue</p>
      <div className='w-[250px] mt-4 flex flex-col space-y-4'>
        <div>
          <TextInput
            name='password'
            type='password'
            placeholder='Password'
            error={warnings.some((x) => x.field === 'password')}
            errorMessage={
              warnings.filter((x) => x.field === 'password')[0]?.message
            }
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div
          onClick={() => {
            handleSetBtnClicked(true)
          }}
        >
          <Button
            text='Confirm'
            func={debounce(() => {
              void (async () => {
                if (password === '') {
                  handleFilterWarning('password') // remove warning if exists
                  handleSetWarning('Password cannot be empty', 'password')
                  setAlert({
                    message: 'Password cannot be empty',
                    type: 'error'
                  })
                  return
                }

                handleFilterWarning('password') // remove warning
                const res = await confirmPassword(password)

                handleSetBtnClicked(false)

                if (!res.success && res.message !== undefined) {
                  handleSetWarning(res.message, 'password')
                  setAlert({
                    message: res.message,
                    type: 'error'
                  })
                } else {
                  await revalidatePasswordTag()
                  setAlert({
                    message: 'Password correct',
                    type: 'success'
                  })
                }
              })()
            }, 500)}
            loading={btnClicked}
          />
        </div>
      </div>
    </div>
  )
}

export default VerifyPassword
