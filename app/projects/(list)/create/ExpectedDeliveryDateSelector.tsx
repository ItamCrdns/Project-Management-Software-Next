import { TimePicker } from '@/components/Time Picker/TimePicker'
import { type Time } from '@/components/Time Picker/TimePicker.interface'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { DatePicker, type DatePickerValue } from '@tremor/react'

const ExpectedDeliveryDateSelector: React.FC<{
  defaultValue: Date
  error?: boolean
  errorMessage?: string
}> = (props) => {
  const { defaultValue, error, errorMessage } = props

  const { setExpectedDeliveryDate } = useNewProjectActions()

  return (
    <>
      <DatePicker
        onValueChange={(date: DatePickerValue) => {
          if (date === undefined) {
            return
          }

          const utcDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          )

          setExpectedDeliveryDate(utcDate.toISOString())
        }}
        placeholder='Set a delivery date for this project'
        defaultValue={
          !isNaN(defaultValue?.getTime()) ? defaultValue : undefined
        }
        minDate={new Date()}
        className={`${
          error === true ? 'border border-red-500 rounded-md' : ''
        } my-4`}
      />
      <div className='my-4'>
        <TimePicker
          error={error}
          handleTimeClick={(time: Time) => {
            if (isNaN(defaultValue?.getTime())) {
              return
            }

            const newDateWithTime = new Date(defaultValue.getTime())
            newDateWithTime.setUTCHours(Number(time.hour.split(':')[0]))
            newDateWithTime.setUTCMinutes(Number(time.hour.split(':')[1]))
            setExpectedDeliveryDate(newDateWithTime.toISOString())
          }}
          disabled={isNaN(defaultValue?.getTime())}
        />
      </div>
      {error === true && (
        <p className='text-sm text-red-500 -mt-2 flex self-start mb-4'>
          {errorMessage}
        </p>
      )}
    </>
  )
}

export { ExpectedDeliveryDateSelector }
