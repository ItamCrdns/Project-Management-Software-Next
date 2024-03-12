import { type Option } from './CustomSelectProps'

export interface ClientSelectionProps {
  clientName: string
  handleClientSelection: (selectedValue: Option | Option[] | null) => void
  isFormOpen: boolean
  searchParams: { clientId: string }
}
