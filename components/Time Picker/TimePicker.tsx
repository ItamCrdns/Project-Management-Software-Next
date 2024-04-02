import { useState } from 'react'
import CustomSelect from '../select/select'
import { timeOptions } from './timeOptions'
import { type Option } from '@/interfaces/props/CustomSelectProps'

const TimePicker: React.FC<{
  onChange: (value: Option) => void
  selectedTime: Option
  disabled?: boolean
}> = (props) => {
  const { onChange, selectedTime, disabled } = props

  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <CustomSelect
      defaultValue={
        selectedTime.label === '' ? 'Select a time...' : selectedTime.label
      }
      options={timeOptions}
      sendStateToParent={(selectedTime) => {
        onChange(selectedTime)
      }}
      shouldShowDropdown={toggle}
      onShowDropdown={() => {
        setToggle(!toggle)
      }}
      closeDropdown={() => {
        setToggle(false)
      }}
      scrollable={true}
      disabled={disabled}
    />
  )
}

export { TimePicker }
