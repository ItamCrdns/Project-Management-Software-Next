import { type Time, type MeridiemIndicator } from './TimePicker.interface'

export interface TimesProps {
  close: () => void
  handleTimeClick: (value: string) => void
  handleMeridiemClick: (value: MeridiemIndicator) => void
  time: Time
}
