import { TimePicker } from '@/components/Time Picker/TimePicker'
import { type Option } from '@/interfaces/props/CustomSelectProps'
import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { timeAmPmTo24h } from '@/utility/timeAmPmTo24h'
import { DatePicker, type DatePickerValue } from '@tremor/react'
import { useState } from 'react'

const ExpectedDeliveryDateSelector: React.FC<{
  defaultValue: Date
  error?: boolean
  errorMessage?: string
}> = (props) => {
  const { defaultValue, error, errorMessage } = props

  const { setExpectedDeliveryDate } = useNewProjectActions()

  const [selectedTime, setSelectedTime] = useState<Option>({
    value: 1,
    label: '12:00 AM'
  })

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
          selectedTime={selectedTime}
          onChange={(newTime) => {
            if (isNaN(defaultValue.getTime())) {
              return
            }

            const timeAs24Hour = timeAmPmTo24h(newTime.label)

            const newDateWithTime = new Date(defaultValue.getTime())
            newDateWithTime.setUTCHours(Number(timeAs24Hour.split(':')[0]))
            newDateWithTime.setUTCMinutes(Number(timeAs24Hour.split(':')[1]))

            setExpectedDeliveryDate(newDateWithTime.toISOString())
            setSelectedTime(newTime)
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
