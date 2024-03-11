import { Button } from '@/components/Button/Button'
import { useFormState } from '@/hooks/useFormState'
import { debounce } from '@/utility/debouce'
import { TextInput } from '@tremor/react'
import { handleChangePassword } from './actions/handleChangePassword'

const ResetPassword: React.FC<{ token: string, email?: string }> = (props) => {
  const { token, email } = props

  const {
    formRef,
    message,
    handleSetMessage,
    btnClicked,
    handleSetBtnClicked,
    handleClick
  } = useFormState()

  return (
    <>
      <form
        ref={formRef}
        action={debounce((formData: FormData) => {
          void (async (formData: FormData) => {
            const newPassword = formData.get('newPassword')?.toString()
            const newPasswordConfirm = formData
              .get('newPasswordConfirm')
              ?.toString()

            if (email === undefined) {
              handleSetMessage({
                type: 'client',
                message: 'Email is not defined'
              })
              handleSetBtnClicked(false)
              return
            }

            const response = await handleChangePassword(token, email, newPassword, newPasswordConfirm)

            if (response !== undefined) {
              handleSetMessage({
                type: response.type,
                message: response.message
              })
              handleSetBtnClicked(false)
            }
          })(formData)
        }, 500)}
        className='flex flex-col gap-4'
      >
        <div>
          <p className='text-sm font-semibold mb-2'>New password</p>
          <TextInput
            name='newPassword'
            type='password'
            placeholder='New password'
            error={message.type === 'passwordError'}
            errorMessage='Please enter a password'
          />
        </div>
        <div>
          <p className='text-sm font-semibold mb-2'>Confirm new password</p>
          <TextInput
            name='newPasswordConfirm'
            type='password'
            placeholder='Confirm new password'
            required
            error={message.type === 'confirmPasswordError'}
            errorMessage={message.message}
          />
        </div>
      </form>
      <div
        className='w-full'
        onClick={() => {
          handleSetBtnClicked(true)
        }}
      >
        <Button text='Reset password' func={handleClick} loading={btnClicked} />
      </div>
    </>
  )
}

export { ResetPassword }
