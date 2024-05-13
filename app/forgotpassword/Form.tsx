'use client'
import { Button } from '@/components/Button/Button'
import { debounce } from '@/utility/debouce'
import { TextInput } from '@tremor/react'
import { submitTokenRequest } from './actions/submitTokenRequest'
import { useFormState } from '@/hooks/useFormState'

const Form: React.FC<{ email: string }> = (props) => {
  const {
    formRef,
    message,
    handleSetMessage,
    btnClicked,
    handleSetBtnClicked,
    handleClick
  } = useFormState()

  const { email: defaultEmail } = props

  return (
    <>
      <form
        ref={formRef}
        action={debounce((formData: FormData) => {
          ;(async (formData: FormData) => {
            const email = formData.get('email')?.toString() ?? ''
            const response = await submitTokenRequest(email)
            if (response !== undefined) {
              handleSetMessage(response)
              handleSetBtnClicked(false)
            }
          })(formData)
        }, 500)}
        className='flex flex-col gap-4'
      >
        <div>
          <p className='text-sm font-semibold mb-2'>Email address</p>
          <TextInput
            name='email'
            placeholder='Email address'
            defaultValue={defaultEmail}
            autoFocus
            required
            error={
              message.type === 'client' && message.message === 'EmailError'
            }
            errorMessage='Please enter an email address'
          />
          <input type='submit' className='hidden' />
        </div>
      </form>
      <div
        className='w-full'
        onClick={() => {
          handleSetBtnClicked(true)
        }}
      >
        <Button text='Submit' func={handleClick} loading={btnClicked} />
      </div>
      <div className='-my-4'>
        {message.type === 'server' && (
          <p className='text-red-500 text-center'>{message.message}</p>
        )}
      </div>
    </>
  )
}

export { Form }
