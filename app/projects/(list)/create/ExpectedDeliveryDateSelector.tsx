import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { DatePicker, type DatePickerValue } from '@tremor/react'

const ExpectedDeliveryDateSelector: React.FC<{
  defaultValue: Date
  error?: boolean
  errorMessage?: string
}> = (props) => {
  const { defaultValue, error, errorMessage } = props

  const { setExpectedDeliveryDate } = useNewProjectActions()

  const getDate = (date: DatePickerValue): void => {
    setExpectedDeliveryDate(date?.toString() ?? '')
  }

  return (
    <>
      <DatePicker
        onValueChange={getDate}
        placeholder='Set a delivery date for this project'
        defaultValue={
          !isNaN(defaultValue?.getTime()) ? defaultValue : undefined
        }
        minDate={new Date()}
        className={`${
          error === true ? 'border border-red-500 rounded-md' : ''
        } my-4`}
      />
      {error === true && (
        <p className='text-sm text-red-500 -mt-2 flex self-start mb-4'>
          {errorMessage}
        </p>
      )}
    </>
  )
}

export { ExpectedDeliveryDateSelector }
