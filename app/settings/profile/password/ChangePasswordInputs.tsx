'use client'
import { changePasswordWithCurrentPassword } from '@/api-calls/post/changePasswordWithCurrentPassword'
import { Button } from '@/components/Button/Button'
import { useFormState } from '@/hooks/useFormState'
import { useWarnings } from '@/hooks/useWarnings'
import { useAlertActions } from '@/lib/hooks/Alert actions/useAlertActions'
import { debounce } from '@/utility/debouce'
import { TextInput } from '@tremor/react'
import { useRouter } from 'next/navigation'
import { useId } from 'react'

const ChangePasswordInputs: React.FC = () => {
  const { formRef, btnClicked, handleSetBtnClicked, handleClick } =
    useFormState()

  const { warnings, handleSetWarning, handleFilterWarning } = useWarnings()
  const { setAlert } = useAlertActions()

  const router = useRouter()

  const alertId = useId()

  return (
    <form
      ref={formRef}
      action={debounce((formData: FormData) => {
        ;(async (formData: FormData) => {
          const currentPassword =
            formData.get('currentpassword')?.toString() ?? ''

          const newPassword = formData.get('newpassword')?.toString() ?? ''

          const confirmPassword =
            formData.get('confirmpassword')?.toString() ?? ''

          if (currentPassword === '') {
            handleSetWarning(
              'Please enter your current password',
              'currentpassword'
            )
          } else {
            handleFilterWarning('currentpassword')
          }

          if (newPassword === '') {
            handleSetWarning('Please enter a new password', 'newpassword')
          } else {
            handleFilterWarning('newpassword')
          }

          if (confirmPassword === '') {
            handleSetWarning(
              'Please confirm your new password',
              'confirmpassword'
            )
          } else {
            handleFilterWarning('confirmpassword')
          }

          if (newPassword.length < 8) {
            handleSetWarning(
              'Password must be at least 8 characters',
              'newpassword'
            )
          }

          handleSetBtnClicked(false)

          if (newPassword !== confirmPassword) {
            handleSetWarning('Passwords do not match', 'passworddismatch')
            handleSetBtnClicked(false)
            return
          }

          handleFilterWarning('passworddismatch')

          const canWeCallApi =
            currentPassword !== '' &&
            newPassword !== '' &&
            confirmPassword !== '' &&
            newPassword.length >= 8 &&
            newPassword === confirmPassword

          if (canWeCallApi) {
            const res = await changePasswordWithCurrentPassword(
              currentPassword,
              newPassword
            )

            if (res.success) {
              setAlert({
                id: alertId + '-success-password-changed',
                message: 'Password changed successfully',
                type: 'success'
              })

              handleSetBtnClicked(false)
              router.push('/settings/profile')
            } else {
              if (res.message !== undefined) {
                setAlert({
                  id: alertId + '-error-password-change-failed',
                  message: res.message,
                  type: 'error'
                })

                handleSetBtnClicked(false)
              }
            }
          }
        })(formData)
      }, 500)}
      className='w-[300px] space-y-4'
    >
      <div className='space-y-2 w-[300px]'>
        <h2 className='font-medium'>Current password</h2>
        <div>
          <TextInput
            name='currentpassword'
            placeholder='Current password'
            error={warnings.some((w) => w.field === 'currentpassword')}
            errorMessage={
              warnings.find((w) => w.field === 'currentpassword')?.message ?? ''
            }
            type='password'
          />
        </div>
      </div>
      <div className='space-y-2 w-[300px]'>
        <h2 className='font-medium'>New password</h2>
        <div>
          <TextInput
            name='newpassword'
            placeholder='New password'
            type='password'
            error={warnings.some((w) => w.field === 'newpassword')}
            errorMessage={
              warnings.find((w) => w.field === 'newpassword')?.message ?? ''
            }
          />
        </div>
      </div>
      <div className='space-y-2 w-[300px]'>
        <h2 className='font-medium'>Confirm password</h2>
        <div>
          <TextInput
            name='confirmpassword'
            placeholder='Confirm password'
            type='password'
            error={
              warnings.some((w) => w.field === 'confirmpassword') ||
              warnings.some((w) => w.field === 'passworddismatch')
            }
            errorMessage={
              warnings.find((w) => w.field === 'confirmpassword')?.message ??
              warnings.find((w) => w.field === 'passworddismatch')?.message ??
              ''
            }
          />
        </div>
      </div>
      <div
        className='pt-4'
        onClick={() => {
          handleSetBtnClicked(true)
        }}
      >
        <Button
          text='Change password'
          func={handleClick}
          loading={btnClicked}
        />
      </div>
    </form>
  )
}

export { ChangePasswordInputs }
