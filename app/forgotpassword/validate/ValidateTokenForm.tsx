import { Button } from '@/components/Button/Button'
import { useFormState } from '@/hooks/useFormState'
import { debounce } from '@/utility/debouce'
import { NumberInput } from '@tremor/react'
import { isTokenValid } from './isTokenValid'

const ValidateTokenForm: React.FC<{
  request: string
  handleSetVerifiedToken: (token: string) => void
}> = (props) => {
  // Request guid and state setter
  const { request, handleSetVerifiedToken } = props

  const {
    formRef,
    message,
    handleSetMessage,
    btnClicked,
    handleSetBtnClicked,
    handleClick
  } = useFormState()

  const onNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.value.length === 6) {
      e.target.blur()
    }

    if (e.target.value.length > 6) {
      e.target.value = e.target.value.slice(0, 6)
    }
  }

  return (
    <>
      <form
        ref={formRef}
        action={debounce((formData: FormData) => {
          void (async (formData: FormData) => {
            const code = formData.get('code')?.toString()
            if (code === undefined || code === '') {
              handleSetMessage({
                type: 'client',
                message: 'Please enter a code'
              })
              handleSetBtnClicked(false)
              return
            }
            const response = await isTokenValid(code, request)
            if (response?.message !== undefined) {
              handleSetMessage({
                type: 'server',
                message: response.message
              })
              handleSetBtnClicked(false)
              if (response.success) {
                handleSetVerifiedToken(code)
              }
            }
          })(formData)
        }, 500)}
      >
        <div>
          <p className='text-sm font-semibold mb-2'>6-Digit code</p>
          <NumberInput
            enableStepper={false}
            placeholder='Enter your 6-code here'
            name='code'
            onChange={onNumberInputChange}
            error={
              (message.type === 'client' ||
                message.type === 'server' ||
                message.message !== '') &&
              message.message !== 'Valid'
            }
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
        <Button text='Submit' func={handleClick} loading={btnClicked} />
      </div>
    </>
  )
}

export { ValidateTokenForm }
