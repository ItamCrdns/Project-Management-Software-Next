import { useNewProjectActions } from '@/lib/hooks/useNewProjectActions'
import { DatePicker, type DatePickerValue } from '@tremor/react'

const ExpectedDeliveryDateSelector: React.FC<{ defaultValue: Date }> = (
  props
) => {
  const { setExpectedDeliveryDate } = useNewProjectActions()

  const getDate = (date: DatePickerValue): void => {
    setExpectedDeliveryDate(date?.toString() ?? '')
  }

  return (
    <DatePicker
      onValueChange={getDate}
      placeholder='Set a delivery date for the project'
      defaultValue={
        !isNaN(props.defaultValue?.getTime()) ? props.defaultValue : undefined
      }
      minDate={new Date()}
    />
  )
}

export default ExpectedDeliveryDateSelector
