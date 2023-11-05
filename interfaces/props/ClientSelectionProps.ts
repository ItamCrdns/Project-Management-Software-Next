import { type Option } from './CustomSelectProps'

export interface ClientSelectionProps {
  clientName: string
  handleClientSelection: (selectedValue: Option) => void
  clearSelectedOption: () => void
  isFormOpen: boolean
}
