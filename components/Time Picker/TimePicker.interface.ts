export type MeridiemIndicator = 'AM' | 'PM'

export interface Time {
  hour: string
  meridiemIndicator: MeridiemIndicator
}

export interface TimePickerProps {
  error?: boolean
  disabled?: boolean
  handleTimeClick: (value: Time) => void
}
