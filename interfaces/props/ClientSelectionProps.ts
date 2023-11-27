import { type Option } from './CustomSelectProps'

export interface ClientSelectionProps {
  clientName: string
  handleClientSelection: (selectedValue: Option | Option[]) => void
  clearSelectedOption: () => void
  isFormOpen: boolean
}
